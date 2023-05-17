'use client';
import { Loader } from '@/primitives/Loader/Loader';
import { articleDetailQuery } from '@/relay/__generated__/articleDetailQuery.graphql';
import { VoteType, articleListQuery } from '@/relay/__generated__/articleListQuery.graphql';
import { commentListQuery, commentListQuery$data } from '@/relay/__generated__/commentListQuery.graphql';
import { CommentListQuery } from '@/relay/comment';
import { createRelayEnvironment } from '@/utils/createRelayEnvironment';
import { getAssetPath } from '@/utils/getAssetPath';
import trans from '@/utils/strings';
import Image from 'next/image';
import Link from 'next/link';
import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { commitMutation, fetchQuery } from 'relay-runtime';
import styles from './ArticleDetail.module.scss';
import { voteSetMutation } from '@/relay/__generated__/voteSetMutation.graphql';
import { VoteSetMutation } from '@/relay/vote';

interface ArticleDetailProps {
    article: articleDetailQuery['response']['articles'];
    related: articleListQuery['response']['articles'];
}

export const ArticleDetail = ({
    article: {
        nodes: [article],
    },
    related: { nodes: relatedArticles },
}: ArticleDetailProps): ReactElement<null, 'div'> | null => {
    const environment = useMemo(() => createRelayEnvironment({}, false), []);
    const authorName = useMemo(() => `${article.user.firstName} ${article.user.lastName}`, []);
    const imagePath = useMemo(() => getAssetPath(article?.featuredImage?.path), []);
    const [comments, setComments] = useState<commentListQuery$data['comments'] | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [votesLoading, setVotesLoading] = useState(true);
    const [loadCount, setLoadCount] = useState(1);

    useEffect(() => {
        setIsLoading(true);
        fetchQuery<commentListQuery>(environment, CommentListQuery, {
            sorting: [{ field: 'createdAt', direction: 'DESC' }],
            filter: { articleId: { eq: article.id } },
        })
            .toPromise()
            .then((comments) => {
                if (comments?.comments) {
                    setComments(comments.comments);
                    setIsLoading(false);
                }
            });
    }, [loadCount]);

    // const setVote = useCallback((commentId: string, voteType: VoteType) => {
    //     setVotesLoading(true);
    //     commitMutation<voteSetMutation>(environment, {
    //         mutation: VoteSetMutation,
    //         variables: { commentId, voteType },
    //         onCompleted(data) {
    //             if (data.setVote.success) {
    //                 const commentIndex = comments?.findIndex((c) => c.id === commentId);
    //                 const newComments = Array.from(comments)
    //                 if(voteType === "up") {

    //                 } else if (voteType === "down" && commentIndex) {
    //                     comments[commentIndex] = comment?.downVotes + 1;
    //                 }
    //                 // setComments((comments) => );
    //             }
    //         },
    //     });
    // }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.contentCol}>
                    <h1>{article.title}</h1>
                    <p className={styles.metadata}>
                        <span>{authorName}</span>
                        <span>
                            {new Date(article.updatedAt).toLocaleDateString('en-US', {
                                day: 'numeric',
                                month: 'numeric',
                                year: '2-digit',
                            })}
                        </span>
                    </p>
                    {imagePath && (
                        <Image
                            className={styles.coverImage}
                            src={imagePath}
                            width={article.featuredImage?.width}
                            height={article.featuredImage?.height}
                            placeholder="blur"
                            blurDataURL={article.featuredImage?.blurhash}
                            sizes="(max-width: 768px) 100vw, 66vw"
                            alt=""
                        />
                    )}
                    <ReactMarkdown className={styles.markdown} children={article.content} />
                    <div className={styles.commentsContainer}>
                        {isLoading ? (
                            <Loader />
                        ) : (
                            <>
                                <h2>
                                    {trans('article_detail.comments.title').replace(
                                        '{count}',
                                        String(comments?.length || 0),
                                    )}
                                </h2>
                                {comments?.length === 0 && (
                                    <p className={styles.noResults}>
                                        {trans('article_detail.comments.no_comments_yet')}
                                    </p>
                                )}
                                {comments?.map((comment) => {
                                    const imagePath = getAssetPath(comment.user.avatar?.path);
                                    const commenterName = `${article.user.firstName} ${article.user.lastName}`;
                                    const voteCount = `${comment.upVotes - comment.downVotes >= 0 ? '+' : ''}${
                                        comment.upVotes - comment.downVotes
                                    }`;

                                    return (
                                        <div className={styles.comment}>
                                            <div>
                                                {comment.user.avatar && imagePath ? (
                                                    <Image
                                                        src={imagePath}
                                                        width={comment.user.avatar.width}
                                                        height={comment.user.avatar.height}
                                                        alt="avatar"
                                                        className={styles.avatar}
                                                        sizes="6rem"
                                                    />
                                                ) : (
                                                    <div className={styles.noImage}>
                                                        {comment.user.firstName.charAt(0)}
                                                        {comment.user.lastName.charAt(0)}
                                                    </div>
                                                )}
                                            </div>
                                            <div className={styles.commentContent}>
                                                <p className={styles.header}>
                                                    <span>{commenterName}</span>
                                                    <span>
                                                        {new Date(comment.createdAt).toLocaleDateString('en-US', {
                                                            minute: 'numeric',
                                                            hour: 'numeric',
                                                            day: 'numeric',
                                                            month: 'numeric',
                                                            year: '2-digit',
                                                        })}
                                                    </span>
                                                </p>
                                                <p className={styles.content}>{comment.content}</p>
                                                <div className={styles.votes}>
                                                    <span>{voteCount}</span>
                                                    <div>
                                                        <Image src={'/chevron-up.svg'} alt="" width={24} height={24} />
                                                    </div>
                                                    <div>
                                                        <Image
                                                            className={styles.downVote}
                                                            src={'/chevron-up.svg'}
                                                            alt=""
                                                            width={24}
                                                            height={24}
                                                        />
                                                    </div>
                                                    <button>
                                                        <span>{trans('article_detail.comments.reply')}</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </>
                        )}
                    </div>
                </div>
                <div className={styles.related}>
                    <h2>{trans('article_detail.related_articles.title')}</h2>
                    {relatedArticles.map((related) => (
                        <div className={styles.relatedArticle}>
                            <Link href={`/articles/${related.slug}`} key={related.id}>
                                <p className={styles.title}>{related.title}</p>
                                <p className={styles.perex}>{related.perex}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
