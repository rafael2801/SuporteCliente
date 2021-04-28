import  { EntityRepository, Repository } from 'typeorm'
import { Settings } from '../entities/Settings'

@EntityRepository(Settings)
class SettingsRep extends Repository<Settings>{}

export { SettingsRep }