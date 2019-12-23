import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)


test('renders content', () => {
  const blog = {
    title: 'Renders Title',
    author: 'Renders Author',
    likes: '3'
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  const div = component.container.querySelector('.titleAuthor')
  expect(div).toHaveTextContent(
    'Renders Title',
    'Renders Author'
  )
  const div2 = component.container.querySelector('.likes')
  expect(div2).toHaveTextContent(
    '3'
  )

})

test('clicking the button twice', async () => {
  const blog = {
    title: 'Renders Title',
    author: 'Renders Author',
    likes: '3'
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )
  console.log(prettyDOM(getByText('like')))

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)



  expect(mockHandler.mock.calls.length).toBe(2)
})