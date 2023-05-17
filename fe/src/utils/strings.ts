/* eslint-disable */

const data: Record<string, Record<string, string>> = {
    cs: {
        'navigation.recent_articles': 'Recent articles',
        'navigation.about': 'About',
        'navigation.auth.log_in': 'Log in',
        'recent_articles.title': 'Recent articles',
        'article.read_whole_article': 'Read whole article',
        'article.comment_count': '{count} comments',
        'articles.pagination.count': 'Showing {loaded} of {total} total articles',
        'articles.pagination.load_more': 'Load More',
        'articles.pagination.no_results': 'No articles yet',
        'navigation.log_out': 'Log out',
        'navigation.my-articles': 'My Articles',
        'navigation.create-article': 'Create Article',
        'login_page.title': 'Log in',
        'login_page.email_placeholder': 'me@example.com',
        'login_page.password_placeholder': '**********',
        'login_page.email_label': 'Email',
        'login_page.password_label': 'Password',
        'login_page.submit_button_label': 'Log In',
        'login_page.validations.required_field': 'This field is required!',
        'login_page.validations.email_invalid': 'E-mail is not valid!',
        'login_page.validations.auth.wrong_user': 'The entered user does not exists!',
        'login_page.validations.auth.wrong_password': 'The entered password is not correct!',
        'my_articles.title': 'My articles',
        'my_articles.button.create_new_article': 'Create new article',
        'create_article.title': 'Create new article',
        'create_article.publish_button.label': 'Publish article',
        'create_article.article_title.label': 'Article Title',
        'create_article.article_title.placeholder': 'My First Article',
        'create_article.perex.title': 'Perex',
        'create_article.perex.placeholder': 'A short summary of your article...',
        'create_article.content.title': 'Content',
        'create_article.content.placeholder': 'Supports markdown. Yay!',
        'create_article.featuredImage.label': 'Featured image',
        'create_article.validations.image.type': 'Only JPG/JPEG and PNG are supported image formats!',
        'create_article.featuredImage.remove': 'Remove/Replace image',
        'update_article.title': 'Edit article',
        'article_detail.related_articles.title': 'Related articles',
        'article_detail.comments.title': 'Comments ({count})',
        'article_detail.comments.no_comments_yet': 'No comments yet...',
        'article_detail.comments.reply': 'Reply',
    },
};

export function transCount(cnt: number) {
    if (cnt === 0) {
        return 'zero';
    }
    if (cnt === 1) {
        return 'one';
    }
    if (cnt < 5) {
        return 'few';
    }
    return 'many';
}

export default function trans(key: string): string {
    return data.cs[key] || key;
}
