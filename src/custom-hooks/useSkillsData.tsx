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
                        order
                        image {
                            fixed(width: 100, height: 100) {
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
