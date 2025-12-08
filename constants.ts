export const intro = `Hello! My name is Vladyslav – I'm a Go engineer and Computer Science student at [KNU](https://knu.ua/en) in Kyiv, Ukraine.

Currently working at [Solidgate](https://solidgate.com), a fintech company providing a unified payment processing platform for international businesses.

I'm always eager to connect on tech and engineering topics. Reach out via [email](mailto:xyz.pavlenko@gmail.com) or [LinkedIn](https://linkedin.com/in/vladyslavpavlenko).`;

// Posts are now loaded from markdown files in server-side functions
// This placeholder will be replaced by actual posts in getStaticProps/getServerSideProps
export const posts: any[] = [];

export const siteSettings = {
  siteTitle: "Vladyslav Pavlenko",
  siteDescription: "Vladyslav Pavlenko’s Blog on Engineering, Technology, and More",
  siteUrl: "https://pvlnk.xyz",
  avatarUrl: null // Using local pic.png instead of LinkedIn (blocked with 403)
};
