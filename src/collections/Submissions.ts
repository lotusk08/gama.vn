import { CollectionConfig } from 'payload';

export const Submissions: CollectionConfig = {
  slug: 'submissions',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'email', 'submittedAt'],
  },
  access: {
    create: () => true,
    read: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      options: ['contact', 'job-application'],
      defaultValue: 'job-application',
      required: true,
    },
    {
      name: 'jobId',
      type: 'text',
    },
    {
      name: 'jobTitle',
      type: 'text',
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'subject',
      type: 'text',
    },
    {
      name: 'message',
      type: 'textarea',
    },
    {
      name: 'cvUrl',
      type: 'text',
    },
    {
      name: 'submittedAt',
      type: 'date',
      admin: {
        readOnly: true,
      },
      defaultValue: () => new Date().toISOString(),
    }
  ],
};
