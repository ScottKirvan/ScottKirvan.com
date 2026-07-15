import { createBlogLoader, type Post } from '../../.vitepress/blogUtils.mts'

declare const data: Post[]
export { data }

export default createBlogLoader('root/devlab/*.md')
