import React from 'react'
import { render, act } from '@testing-library/react'
import Calc from './index'

beforeAll(() => {
  const fakerUser = 'enochjs'
  jest.spyOn(global, 'fetch').mockImplementation(() => {
      return Promise.resolve({
          json: () => Promise.resolve(fakerUser)
      }) as any
  })
})

describe('test calc', () => {

  test('render right', async () => {
    let container: any
    await act(async () => {
      container = render(<Calc />)
    })
    expect(container.queryByText('每次加一')).toBeInTheDocument()
    expect(container.queryByText('0')).toBeInTheDocument()
  })

  test('radio change', async () => {
    let container: any
    await act(async () => {
      container = render(<Calc />)
    })
    const radios = document.querySelectorAll('input')
    act(() => {
      radios[1].dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(container.queryByText('每次减一')).toBeInTheDocument()
  })

  test('count change', async () => {
    let container: any
    await act(async () => {
      container = render(<Calc />)
    })
    const button = container.queryByText('modify')
    act(() => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(container.queryByText('1')).toBeInTheDocument()

    const radios = document.querySelectorAll('input')
    act(() => {
      radios[1].dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    act(() => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(container.queryByText('0')).toBeInTheDocument()
  })

  test('render with fetch data', async () => {
    let container: any
    await act(async () => {
      container = render(<Calc id={123} />)
    })
    expect(container.queryByText("copy right enochjs")).toBeInTheDocument();
  })

})
