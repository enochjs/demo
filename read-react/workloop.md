## react-fiber work-loop

```javascript
/*                                                                                                                                       
 *                       +--------------------------+                                                                                    
 *                       |unstable_scheduleCallback |<----------------------------------------------------------------------------------^
 *                       +-------------+------------+                                                                                   |
 *                                     |                                                                                                |
 *                                     |                                                                                                |
 *                                     v                                                                                                |
 *                                    / \                                                                                               |
 *                                   /   \                                                                                              |
 *                            +---------------+            +------------------------------+                                             |
 *                            |     delay     +----true--->|  push(timerQueue, newTask)   |                                             |
 *                            +---------------+            +------------------------------+                                             |
 *                                   \   /                                                                                              |
 *                                    \ /                                                                                               |
 *                                     |                                                                                                |
 *                                     |                                                                                                |
 *                                     |                                                                                                |
 *                                     |                                                                                                |
 *                       +-------------v-------------+                                                                                  |
 *                       | push(taskQueue, newTask); |                                                                                  |
 *                       +-------------+-------------+                                                                                  |
 *                                     |                                                                                                |
 *                                     |                                     X                                                          |
 *                                     |                                    / \                                                         |
 *                                     |                                   /   \                                                        |
 *                       +-------------v--------------+             +--------------------+               +----------------------+       |
 *                       |    requestHostCallback     <-------------+      timeout       <---------------|  requestHostTimeout  |<-+    |
 *                       +-------------+--------------+             +--------------------+               +----------------------+  |    |
 *                                     |                                   \   /                                                   |    |
 *                                     |                                    \ /                                                    |    |
 *                      +--------------v---------------+                     V                                                     |    |
 *        +------------>|         postMessage          |--------------------+                                                      |    |
 *        |             +--------------+---------------+                    |                                                      |    |
 *        |                            |                                    |                                                      |    |
 *        |                     yeild to browser                            |                                                      |    |
 *        |                            |                                    |                                                      |    |
 *        |            +---------------v-------------------+                |                                                      |    |
 *        |            |    browser work, when finidsh,    |                |                                                      |    |
 *        |            |   it will call onmessage event    |                |                                                      |    |
 *        |            +---------------+-------------------+                |                                                      |    |
 *        |                            |                                    |                                                      |    |
 *        |                yeild to javascript main thread                  |                                                      |    |
 *        |                            |                                  true                                                     |    |
 *        |          +-----------------v------------------+                 |                                                      |    |
 *        |          | onmessage=performWorkUntilDeadline |                 |                                                      |    |
 *        |          +-----------------+------------------+                 |                                                      |    |
 *        |                            |                                    |                                                      |    |
 *        |                            v                                    |                                                      |    |
 *        |                            X                                    |                                                      |    |
 *        |                           / \                                   |                                                      |    |
 *        |                          /   \                                  |                                                      |    |
 *        |          +----------------------------------+                   |                                                      |    |
 *        |          |  scheduledHostCallback !== null  |                   |                                                      |    |
 *        |          +----------------------------------+                   |                                                      |    |
 *        |                          \   /                                  v                                                      |    |
 *        |                           \ /                                   X                                                      |    |
 *        |                            |                                   / \                                                     |    |
 *        |                            |                                  /   \                                                    |    |
 *   hasmorework                       |                                 /     \                   +------------------------------+|    |
 *      true             +-------------v-------------+           +----------------------+          |isMessageLoopRunning = false; ||    |
 *        |              |   scheduledHostCallback   |---------->|     hasmorework      +--false+->|scheduledHostCallback = null; ||    |
 *        |              +-------------+-------------+           +----------------------+       |  +------------------------------+|    |
 *        |                            |                                 \     /                |                                  |    |
 *        |                            |                                  \   /                 |                                  |    |
 *        |                            |                                   \ /                  |                                  |    |
 *        |                            |                                    V                   |                                  |    |
 *        |      +---------------------v-----------------------+                                |                                  |    |
 *        |      |  flushWork(hasTimeRemaining, initialTime)   |                                |                                  |    |
 *        |      +---------------------+-----------------------+                                |                                  |    |
 *        |                            |                                                        |                                  |    |
 *        |                            |                                                        |                                  |    |
 *        |                            |                                                        |                                  |    |
 *        |              +-------------v--------------+                                         |                                  |    |
 *        |              |          workLoop          |                                         |                                  |    |
 *        |              +-------------+--------------+                                         |                                  |    |
 *        |                            |                                                        |                                  |    |
 *        |                            |                                                        |                                  |    |
 *        |                            |                                                        |                                  |    |
 *        |             +--------------v--------------+                                         |                                  |    |
 *        |             |        advanceTimers        |<------------+                           |                                  |    |
 *        |             +--------------+--------------+             |                           |                                  |    |
 *        |                            |                            |                           |                                  |    |
 *        |                            |                            |                           |                                  |    |
 *        |                            |                            |                           |                                  |    |
 *        |                            |                            |                           |                                  |    |
 *        |             +--------------v--------------+             |                           |                                  |    |
 *        |             |currentTask=peek(taskQueue); |             |                           |                                  |    |
 *        |             +--------------+--------------+             |                           |                                  |    |
 *        |                            |                            |                           |                                  |    |
 *        |                            |                            |                   .---------------.                          |    |
 *        |                            v                            |             _.---'                 `----.                    |    |
 *        |                           / \                           |           ,'   +---------------------+   `.                  |    |
 *        |                          /   \                          |         ,'     |    return false     |     `.                |    |
 *        |          +-------------------------------------+        |        ;       +---------------------+       :               |    |
 *        |          |        currentTask !== null         |--------+--------:                                     ;               |    |
 *        |          +-------------------------------------+        |         \       +---------------------+     /                |    |
 *        |                          \   /                          |          `.     |     timeQueue?      |----------------------+    |
 *        |                           \ /                           |            `.   +---------------------+ ,'                        |
 *        |                            |                            |              `----.               _.---'                          |
 *        |                            |                            |                    `-------------'                                |
 *        |                          true                           |                                                                   |
 *        |                            |                            |                                                                   |
 *        |                            v                            |                                                                   |
 *        |                            X                            |                                                                   |
 *        |                           / \                           |                                                                   |
 *        |  +------------------------------------------------+     |                                                                   |
 *        |  |   currentTask.expirationTime>currentTime &&    |     |                                                                   |
 *        +--|   (!hasTimeRemaining || shouldYieldToHost())   |     |                                                                   |
 *           +------------------------------------------------+     |                                                                   |
 *                                   \   /                          |                                                                   |
 *                                    \ /                           |                                                                   |
 *                                     |                            |                                                                   |
 *                                     |                            |                                                                   |
 *                                     |                            |                                                                   |
 *               +---------------------+------------------------+   |                                                                   |
 *               |            continuatvonCallback=             |   |                                                                   |
 *               |       callback(didUserCallbackTimeout)       |---+----+                                                              |
 *               +----------------------+-----------------------+   |    |                                                              |
 *                                      |                           |    |                                                              |
 *                                      |                           |    |                                                              |
 *                                      |                           |    |                                                              |
 *                                      v                           |    |                                                              |
 *                                     / \                          |    |                                                              |
 *                    +---------------------------------+           |    |                                                              |
 *                    | continuationCallback===function |           |    |                                                              |
 *                    |        means task finish        |--false---->    |                                                              |
 *                    +---------------------------------+           |    |                                                              |
 *                                    \   /                         |    |                                                              |
 *                                     \ /                          |    |                                                              |
 *                                      |                           |    |                                                              |
 *                                    true                          |    |                                                              |
 *                                      |                           |    |                                                              |
 *                                      |                           |    |                                                              |
 *                     +----------------v------------------------+  |    |                                                              |
 *                     |             pop(taskQueue);             |--+    |                                                              |
 *                     +-----------------------------------------+       |                                                              |
 *                                                                       |                                                              |
 *                                                                       |                                                              |
 *                                                                       |                                                              |
 *                                                                       |                                                              |
 *                                                                       |                                                              |
 *                                                                       |                                                              |
 *                                                                       |                                                              |
 *                                                                       v                                                              |
 *                                                 +------------------------------------------+                                         |
 *                                                 |           performSyncWorkOnRoot          |                                         |
 *                                                 +----------------------+-------------------+                                         |
 *                                                                        |                                                             |
 *                                                                        |                                                             |
 *                                                                        |                                                             |
 *                                                                        |                                                             |
 *                                                                        |                                                             |
 *                                                                        v                                                             |
 *                                                      +--------------------------+                                                    |
 *                                                      |      renderRootSync      |                                                    |
 *                                                      +-------------+------------+                                                    |
 *                                                                    |                                                                 |
 *                                                                    |                                                                 |
 *                                                                    |                                                                 |
 *                                                                    |                                                                 |
 *                                                                    |                                                                 |
 *                                                         +----------v--------------------------------------------+                    |
 *                                                 +-------|                     workLoopSync                      |                    |
 *                                                 |       +--------------+--------------------------------------+-+                    |
 *                                                 |                      |                                      |                      |
 *                                                 |                      |                                      |                      |
 *                                                 |                      |                                      |                      |
 *                                                 |                      v                                      |                      |
 *          +--------------------------------+     |     +-------------------------+               +-------------v----------+           |
 *     +-+->|       performUnitOfWork        <-----+     |       commitRoot        |               | ensureRootIsScheduled  +----------->
 *     | |  +----------------+---------------+           +--------------+----------+               +------------------------+           |
 *     | |                   |                                          |                                                               |
 *     | |                   |                                          |                                                               |
 *     | |                   |                                          |                                                               |
 *     | |                   |                     +--------------------v---------------------------------------------------+           |
 *     | |    +--------------v---------------+     |                            runWithPriority                             |           |
 *     |rue   |   beginWork(current,....)    |     +---------------+---------------------------------+------------------+---+           |
 *     | |    +-------------+----------------+                     |                                 |                  |               |
 *     | |                  |                                      |                                 |                  |               |
 *     | |                  v                                      |                                 |                  |               |
 *     | |                  X                      +---------------v-------------+    +--------------v-------++---------v----------+    |
 *     | |                 / \                     | commitBeforeMutationEffects |    |commitMutationEffects ||commitLayoutEffects |    |
 *     | |                /   \                    +-------------------------+---+    +---------------+------++--------------------+    |
 *     | |       +--------------------+               |                      |                        |                       |         |
 *     | +-------|    next!==null     |               |                      |                        |                       |         |
 *     |         +--------------------+               |                      |                        |                       |         |
 *     |                  \   /                       |                      |                        |                       |         |
 *     |                   \ /                        |                      |                        |                       |         |
 *     |                    V                         |                      v                        |                       v         |
 *     |                    |                         v                                    +----------v-----+ +--------------------+    |
 *     |                false            +-------------------------+ +--------------------+|   placement    | |    layoutEffect    |    |
 *     |                    |            | getSnapshotBeforeUpdate | |flushPassiveEffects || effect.destroy | | componentDidMount  |    |
 *     |                    v            +-------------------------+ +----------------+---+|    unmount     | | componentDidUpdate |    |
 *     |     +----------------------------+                                           |    +----------------+ +--------------------+    |
 *     |  +->|     completeUnitOfWork     |<-+                                        |                                                 |
 *     |  |  +------------+---------------+  |                                        |                                                 |
 *     |  |               |                  |                                        |                                                 |
 *     |  |               |                  |                                        |                                                 |
 *     |  |               v                  |                                        |                                                 |
 *     |true              X                  |                                        |                                                 |
 *     |  |              / \                 |                                        |                                                 |
 *     |  |             /   \                |                                        |                                                 |
 *     |  |     +---------------------+      |                                        |                                                 |
 *     |  +-----|     next!==null     |      |                                        |                                                 |
 *     |        +---------------------+      |                                        |                                                 |
 *   true               \   /                |                                        --------------------------------------------------|
 *     |                 \ /                 |                                                                                           
 *     |                  V                  |                                                                                           
 *     |                  |                  |                                                                                           
 *     |                false                |                                                                                           
 *     |                  |                  |                                                                                           
 *     |                  v                  |                                                                                           
 *     |                 / \                 |                                                                                           
 *     |                /   \                |                                                                                           
 *     |  +------------------------------+   |                                                                                           
 *     +--|     siblingFiber!==null      |   |                                                                                           
 *        +------------------------------+   |                                                                                           
 *                      \   /                |                                                                                           
 *                       \ /                 |                                                                                           
 *                        |                  |                                                                                           
 *                        |                  |                                                                                           
 *                        |                  |                                                                                           
 *                        |                  |                                                                                           
 *                        v                  |                                                                                           
 *                       / \                 |                                                                                           
 *                      /   \                |                                                                                           
 *          +--------------------------+     |                                                                                           
 *          |    returnFiber!==null    |-----+                                                                                           
 *          +--------------------------+                                                                                                 
 *                      \   /                                                                                                            
 *                       \ /                                                                                                             
 *                        V                                                                                                              
 *                        |                                                                                                              
 *                        |                                                                                                              
 *             +----------v----------+                                                                                                   
 *             |         end         |                                                                                                   
 *             +---------------------+                                                                                                   
 */                                                                                                                                      
```