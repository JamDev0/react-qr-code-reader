import type { Meta, StoryObj } from '@storybook/react';
import '../styles/tailwind.css';

import { QrReaderViewFinder } from '../components/QrReader';
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'QrReader/ViewFinder',
  component: QrReaderViewFinder,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    color: {
      control: {
        type: 'color'
      }
    }
  },
  tags: ['autodocs'],
  decorators: [
    (story) => (
      <div className='h-screen py-7 w-full flex items-center justify-center'>
        <div className="relative aspect-square h-full w-auto">
          {story()}
        </div>
      </div>
    )
  ],
} satisfies Meta<typeof QrReaderViewFinder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'View Finder',
}
