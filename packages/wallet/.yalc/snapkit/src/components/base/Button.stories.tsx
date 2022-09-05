import React from 'react'
import { Button, ButtonProps } from './Button'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Button',
  component: Button
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args: ButtonProps) => <Button size='large' {...args}></Button>

export const Primary = Template.bind({})
Primary.args = { primary: true, children: <span>Primary</span> }

export const Disabled = Template.bind({})
Disabled.args = { primary: true, disabled: true, children: <span>Disabled</span> }

export const Loading = Template.bind({})
Loading.args = { loading: true }

export const Size = () => <>
  <p>
    <Button primary size='small'>
      <span>Small</span>
    </Button>
  </p>
  <p>
  <Button primary size='medium'>
      <span>Medium</span>
    </Button>
  </p>
  <p>
  <Button primary size='large'>
      <span>Large</span>
    </Button>
  </p>
  <p>
  <Button primary>
      <span>Size is null</span>
    </Button>
  </p>
</>

export const CustomTagName = () => <Button tagName='a' primary href='https://google.com/' target='__blank'>
  <span>This is a link</span>
</Button>
