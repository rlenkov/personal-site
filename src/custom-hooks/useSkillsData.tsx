import { useStaticQuery, graphql } from 'gatsby'

export default () => {
    const payload = useStaticQuery(
        graphql`
        query {
            allContentfulSkillDescriptions {
                edges {
                    node {
                        title
                        description {
                            json
                        }
                        image {
                            fixed(width: 300) {
                                width
                                height
                                src
                                srcSet
                            }
                        }
                    }
                }
            }
        }
        `
    )
    return payload
}
