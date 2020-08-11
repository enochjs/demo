import React from 'react'


import Hello from './index'
import { unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { render } from '@testing-library/react'


let container: HTMLDivElement = null as any as HTMLDivElement

beforeEach(() => {
    container = document.createElement('div')
    document.body.append(container)
})

afterEach(() => {
    unmountComponentAtNode(container!)
    container!.remove()
    container = null as any as HTMLDivElement
})

it('render hello with name or not', () => {
    act(() => {
        render(<Hello />, { container })
    })
    expect(container.textContent).toBe('嘿，陌生人')

    act(() => {
        render(<Hello name="enochjs" />, { container })
    })
    expect(container.textContent).toBe('你好，enochjs！')
    
})