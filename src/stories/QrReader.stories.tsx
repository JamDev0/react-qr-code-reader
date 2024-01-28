import type { Meta, StoryObj } from '@storybook/react';
import { QrReader, QrReaderProps, QrReaderViewFinder } from '../components/QrReader';

const meta = {
  title: 'QrReader/Reader',
  component: QrReader,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    videoConstrains: {
      control: 'object',
    },
    scanDelay: {
      control: {
        type: 'range',
        min:100, 
        max:5000, 
        step: 200,
      },
    },
    scanSuccessDelay: {
      control: {
        type: 'range',
        min:100, 
        max:5000, 
        step: 200
      },
    },
    read: {
      control: 'boolean',
    },
    flipVideo: {
      control: 'boolean',
    },
    onRead: {
      action: 'QrCodeValue',
      table: {
        disable: true
      }
    },
    onReadError: {
      action: 'QrCodeError',
      table: {
        disable: true
      }
    },
  },
  args: {
    read: false,
  },
  tags: ['autodocs'],
  decorators: [
    (story) => (
      <div className='h-screen py-7 w-full flex items-center justify-center'>
        <div className="aspect-square h-full w-auto">
          {story()}
        </div>
      </div>
    )
  ],
} satisfies Meta<QrReaderProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Reader',
}

export const ReaderWithViewFinder: Story = {
  name: 'Reader with ViewFinder',
  args: {
    children: <QrReaderViewFinder />
  },
  argTypes: {
    children: {
      table: {
        disable: true
      }
    },
  }
}
