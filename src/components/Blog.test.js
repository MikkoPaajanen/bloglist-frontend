import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import Blog from './Blog'

afterEach(cleanup)


// test to see if Blog component renders only title and author by default
test('renders only title and author', () => {
  const blog = {
    title: 'Renders Title',
    author: 'Renders Author',
    likes: '3',
    user: {
      username: 'mikkis',
      name: 'mikko paajanen'
    }
  }

  const remove = 'someOneElse'
  const currentTitle = 'Another Title'
  const showAll = false

  const component = render(
    <Blog blog={blog} remove={remove} currentTitle={currentTitle} showAll={showAll} />
  )

  const div = component.container.querySelector('.titleAuthor')
  component.debug()
  expect(div).toHaveTextContent(
    'Renders Title',
    'Renders Author',
  )
  expect(div).not.toHaveTextContent(
    'mikkis',
    'mikko paajanen',
    '3'
  )
})

// test to see if all info is rendered after clicking title or author name
test('renders all info after click', () => {
  const blog = {
    title: 'Renders Title',
    author: 'Renders Author',
    likes: '3',
    user: {
      username: 'mikkis',
      name: 'mikko paajanen'
    }
  }

  const remove = 'mikkis'
  const currentTitle = 'Renders Title'
  const showAll = true

  const component = render(
    <Blog blog={blog} remove={remove} currentTitle={currentTitle} showAll={showAll} />
  )

  const div = component.container.querySelector('.titleAuthor')
  component.debug()
  expect(div).toHaveTextContent(
    'Renders Title',
    'Renders Author',
    'mikkis',
    'mikko paajanen',
    '3'
  )
})
