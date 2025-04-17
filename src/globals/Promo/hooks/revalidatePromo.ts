import { revalidateTag } from 'next/cache'
import { GlobalAfterChangeHook } from 'payload'

export const revalidatePromo: GlobalAfterChangeHook = (props) => {
  if (!props.context.disableRevalidate) {
    props.req.payload.logger.info(`Revalidating promo`)
    revalidateTag('global_promo')
  }
  return props.doc
}
