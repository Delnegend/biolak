import { CollectionConfig, CollectionSlug } from 'payload'

export type CollectionConf<T extends CollectionSlug> = Omit<CollectionConfig<T>, 'slug'> & {
	slug: T
}
