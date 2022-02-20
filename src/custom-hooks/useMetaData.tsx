import { useStaticQuery, graphql } from 'gatsby'

export default () => {
    const payload = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                        description
                        mapsKey
                        cvLink
                    }
                }
            }
        `
    )
    return payload
}
