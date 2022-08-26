// ArticlesListArticlePreview.spec.ts
import ArticlesListArticlePreview from 'src/components/ArticlesListArticlePreview.vue'
import { useUserStore } from 'src/store/user'
import fixtures from 'src/utils/test/fixtures'
import { setActivePinia, createPinia } from 'pinia'

const favoriteButton = 'Favorite article'

describe('# ArticlesListArticlePreview', () => {
  it('should call favorite method when click favorite button', () => {
    setActivePinia(createPinia())
    const userStore = useUserStore()
    cy.stub(userStore, 'isAuthorized').returns(true)
    cy.intercept('POST', '/api/articles/*/favorite', { status: 200 }).as('favoriteArticle')
    cy.mount(ArticlesListArticlePreview, {
      props: { article: fixtures.article },
    })

    cy.findByRole('button', { name: favoriteButton }).click()

    cy.wait('@favoriteArticle')
  })
})
