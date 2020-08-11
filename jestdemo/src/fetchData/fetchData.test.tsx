import React from 'react'
import { unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { render } from '@testing-library/react'
import fetch from 'jest-fetch-mock';
import FetchData from './index'


let container: HTMLDivElement = null as any as HTMLDivElement

beforeEach(() => {
    container = document.createElement('div')
    document.body.append(container)
})

afterEach(() => {
    unmountComponentAtNode(container)
    container.remove()
    container = null as any as HTMLDivElement
})


it('render with fetch data', async () => {
    const fakerUser = {
        name: 'enochjs',
        age: '29',
        address: 'test address',
    }

    jest.spyOn(global, 'fetch').mockImplementation(() => {
        return Promise.resolve({
            json: () => Promise.resolve(fakerUser)
        }) as any
    })

    await act(async () => {
        render(<FetchData id={123} />, { container })
    })

    expect(container.querySelector("summary")?.textContent).toBe(fakerUser.name);
    expect(container.querySelector("strong")?.textContent).toBe(fakerUser.age);
    expect(container.textContent).toContain(fakerUser.address);
  
    // 清理 mock 以确保测试完全隔离
    global.fetch.mockRestore();

})
