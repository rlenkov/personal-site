require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
    siteMetadata: {
        title: 'Richard Lenkovits',
        description: 'Developer site of Richard Lenkovits.',
        author: '@rlenkov',
        mapsKey: process.env.GOOGLE_API_TOKEN,
        cvLink: 'https://drive.google.com/file/d/148o4h2LzgPBMCI6dTr4OzL3dp8pstwxA/view?usp=sharing',
    },
    plugins: [
        'gatsby-plugin-react-helmet',
        {
            resolve: 'gatsby-plugin-sass',
            options: {
                sassOptions: {
                    includePaths: [
                        'src/styles',
                        'src/components',
                        'src/components/addons',
                        'src/components/pages',
                    ],
                },
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'content',
                path: `${__dirname}/content/`,
            },
        },
        {
            resolve: 'gatsby-plugin-react-svg',
            options: {
                rule: {
                    include: `${__dirname}/src/images`,
                },
            },
        },
        {
            resolve: 'gatsby-plugin-google-fonts',
            options: {
                fonts: ['Biryani'],
            },
        },
        'gatsby-transformer-sharp',
        'gatsby-plugin-sharp',
        'gatsby-plugin-image',
        'gatsby-plugin-typescript',
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: ['gatsby-remark-copy-linked-files'],
            },
        },
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                name: 'Richard Lenkovits',
                short_name: 'Porfolio',
                start_url: '/',
                background_color: '#17181D',
                theme_color: '#17181D',
                display: 'minimal-ui',
                icon: 'src/images/logo_rilenk.svg',
            },
        },
    ],
}
