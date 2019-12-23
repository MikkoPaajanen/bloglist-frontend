import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import Blog from './Blog'

afterEach(cleanup)


test('renders content', () => {
  const blog = {
    title: 'Renders Title',
    author: 'Renders Author',
    likes: '3',
    user: {
      username: 'mikkis',
      name: 'mikko paajanen'
    }
  }

  const component = render(
    <Blog blog={blog} />
  )

  const div = component.container.querySelector('.titleAuthor')
  expect(div).toHaveTextContent(
    'Renders Title',
    'Renders Author',
  )
})
