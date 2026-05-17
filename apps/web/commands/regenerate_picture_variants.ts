import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { RegenerateService } from '@jrmc/adonis-attachment'
import Picture from '#picture/models/picture'

export default class RegeneratePictureVariants extends BaseCommand {
  static commandName = 'pictures:regenerate-variants'
  static description = 'Regenerate WebP variants for all existing pictures'

  static options: CommandOptions = {
    startApp: true,
  }

  async run() {
    this.logger.info('Regenerating WebP variants for all pictures...')

    await new RegenerateService().model(Picture, { variants: ['webp'] }).run()

    this.logger.success('Done! WebP variants generated for all pictures.')
  }
}
