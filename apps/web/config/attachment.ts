import { defineConfig } from '@jrmc/adonis-attachment'
import { type InferConverters } from '@jrmc/adonis-attachment/types/config'

const attachmentConfig = defineConfig({
  preComputeUrl: true,
  converters: {
    thumbnail: {
      format: { format: 'webp', options: { quality: 80 } },
      resize: { width: 400, height: 400, fit: 'cover' },
    },
    webp: {
      format: { format: 'webp', options: { quality: 85 } },
      resize: { width: 1920, withoutEnlargement: true },
    },
  },
})

export default attachmentConfig

declare module '@jrmc/adonis-attachment' {
  interface AttachmentVariants extends InferConverters<typeof attachmentConfig> {}
}
