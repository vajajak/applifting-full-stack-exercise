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
