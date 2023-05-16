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
