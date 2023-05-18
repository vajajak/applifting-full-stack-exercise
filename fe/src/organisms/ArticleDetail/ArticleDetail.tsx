'use client';
import useUser, { UserData } from '@/hooks/useUser';
import { Button } from '@/primitives/Button/button';
import { Loader } from '@/primitives/Loader/Loader';
import { TextInput } from '@/primitives/TextInput/TextInput';
import { articleDetailQuery } from '@/relay/__generated__/articleDetailQuery.graphql';
import { VoteType, articleListQuery } from '@/relay/__generated__/articleListQuery.graphql';
import { commentCreateMutation } from '@/relay/__generated__/commentCreateMutation.graphql';
import { commentListQuery, commentListQuery$data } from '@/relay/__generated__/commentListQuery.graphql';
import { voteSetMutation } from '@/relay/__generated__/voteSetMutation.graphql';
import { CommentCreateMutation, CommentCreateSubscription, CommentListQuery } from '@/relay/comment';
import { VoteSetMutation } from '@/relay/vote';
import { createRelayEnvironment } from '@/utils/createRelayEnvironment';
import { getAssetPath } from '@/utils/getAssetPath';
import trans from '@/utils/strings';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import _ from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, ReactElement, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { requestSubscription } from 'react-relay';
import { commitMutation, fetchQuery } from 'relay-runtime';
import * as yup from 'yup';
import styles from './ArticleDetail.module.scss';

interface ArticleDetailProps {
    article: articleDetailQuery['response']['articles'];
    related: articleListQuery['response']['articles'];
}

interface FormData {
    content: string;
}

const schema = yup
    .object({
        content: yup.string().required(trans('login_page.validations.required_field')),
    })
    .required();

const Comment = ({
    comment,
    article,
    votesLoading,
    setReplyTo,
    user,
    setVote,
    nested,
}: {
    comment: Array<
        | (commentListQuery$data['comments'][0] & { children: commentListQuery$data['comments'] })
        | commentListQuery$data['comments'][0]
    >[0];
    article: ArticleDetailProps['article']['nodes'][0];
    votesLoading: boolean;
    setReplyTo?: Dispatch<SetStateAction<commentListQuery$data['comments'][0] | undefined>>;
    user?: UserData | undefined;
    setVote: (commentId: string, voteType: VoteType) => void;
    nested?: boolean;
}) => {
    const imagePath = getAssetPath(comment.user.avatar?.path);
    const commenterName = `${article.user.firstName} ${article.user.lastName}`;
    const voteCount = `${comment.upVotes - comment.downVotes >= 0 ? '+' : ''}${comment.upVotes - comment.downVotes}`;

    return (
        <>
            <div className={clsx(styles.comment, nested && styles.nested)}>
                <div className={styles.avatarContainer}>
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
                        <div className={clsx((votesLoading || comment.voted == 'up') && styles.disabled)}>
                            <Image
                                src={'/chevron-up.svg'}
                                alt=""
                                width={24}
                                height={24}
                                onClick={() => {
                                    setVote(comment.id, 'up');
                                }}
                            />
                        </div>
                        <div className={clsx((votesLoading || comment.voted === 'down') && styles.disabled)}>
                            <Image
                                className={clsx(styles.downVote)}
                                src={'/chevron-up.svg'}
                                alt=""
                                width={24}
                                height={24}
                                onClick={() => {
                                    setVote(comment.id, 'down');
                                }}
                            />
                        </div>
                        {!nested && user && (
                            <button
                                onClick={() => {
                                    setReplyTo?.(comment);
                                }}
                            >
                                <span>{trans('article_detail.comments.reply')}</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {'children' in comment &&
                comment?.children?.map((c) => (
                    <Comment
                        key={c.id}
                        article={article}
                        comment={c}
                        votesLoading={votesLoading}
                        setVote={setVote}
                        nested
                    />
                ))}
        </>
    );
};

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
    const [votesLoading, setVotesLoading] = useState(false);
    const [sortedComments, setSortedComments] = useState<
        Array<commentListQuery$data['comments'][0] & { children: commentListQuery$data['comments'] }> | undefined
    >();
    const [commentLoading, setCommentLoading] = useState(false);
    const { user } = useUser();
    const avatarImagePath = useMemo(() => getAssetPath(user?.avatar?.path), [user]);
    const [replyTo, setReplyTo] = useState<commentListQuery$data['comments'][0] | undefined>(undefined);

    const { register, handleSubmit, watch, reset } = useForm<FormData>({
        defaultValues: {
            content: '',
        },
        resolver: yupResolver(schema),
    });
    const commentContent = watch('content');

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
    }, []);

    useEffect(() => {
        const res = comments
            ?.filter((c) => !c.parent)
            .map((c) => ({
                ...c,
                parent: null,
                children: comments.filter((co) => co.parent?.id === c.id).reverse(),
            }))
            .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
            .reverse();
        setSortedComments(res);
    }, [comments]);

    useEffect(() => {
        requestSubscription(environment, {
            subscription: CommentCreateSubscription,
            variables: { articleId: article.id },
            onNext: (data) => {
                const { createdComment } = data as { createdComment: commentListQuery$data['comments'][0] };
                const newComments = comments ? [..._.cloneDeep(comments)] : [];
                newComments?.push(createdComment);
                setComments(newComments.filter((e, i, a) => a.findLastIndex((c) => c.id === e.id) === i));
            },
        });
    }, [comments, article.id]);

    const onSubmit: SubmitHandler<FormData> = useCallback(
        async (values) => {
            setCommentLoading(true);

            commitMutation<commentCreateMutation>(environment, {
                mutation: CommentCreateMutation,
                variables: {
                    input: { comment: { articleId: article.id, content: values.content, parentId: replyTo?.id } },
                },
                onCompleted(data) {
                    if (data.createOneComment.id) {
                        setCommentLoading(false);
                        setReplyTo(undefined);
                        reset();
                    }
                },
            });
        },
        [replyTo],
    );

    const setVote = useCallback(
        (commentId: string, voteType: VoteType) => {
            if (comments?.find((c) => c.id === commentId)?.voted !== voteType) {
                setVotesLoading(true);
                commitMutation<voteSetMutation>(environment, {
                    mutation: VoteSetMutation,
                    variables: { commentId, voteType },
                    onCompleted(data) {
                        if (data.setVote.success) {
                            const comment = comments?.find((c) => c.id === commentId);
                            const newComments = comments ? [..._.cloneDeep(comments)] : [];
                            if (voteType === 'up' && comment) {
                                newComments.push({
                                    ...comment,
                                    voted: 'up',
                                    ...(comment.voted && { downVotes: comment.downVotes - 1 }),
                                    upVotes: comment.upVotes + 1,
                                });
                            } else if (voteType === 'down' && comment) {
                                newComments.push({
                                    ...comment,
                                    downVotes: comment.downVotes + 1,
                                    ...(comment.voted && { upVotes: comment.upVotes - 1 }),
                                    voted: 'down',
                                });
                            }
                            setComments(newComments.filter((e, i, a) => a.findLastIndex((c) => c.id === e.id) === i));
                            setVotesLoading(false);
                        }
                    },
                });
            }
        },
        [comments],
    );

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
                                <form onSubmit={handleSubmit(onSubmit)} className={styles.comment}>
                                    <div className={styles.avatarContainer}>
                                        {user?.avatar && avatarImagePath ? (
                                            <Image
                                                src={avatarImagePath}
                                                width={user.avatar.width}
                                                height={user.avatar.height}
                                                alt="avatar"
                                                className={styles.avatar}
                                                sizes="6rem"
                                            />
                                        ) : (
                                            <div className={styles.noImage}>
                                                {user?.firstName.charAt(0)}
                                                {user?.lastName.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <div className={styles.commentInput}>
                                        <TextInput
                                            name="content"
                                            register={register}
                                            placeholder={
                                                !user
                                                    ? trans('article_detail.comments.placeholder_log_in')
                                                    : trans('create_article.article_title.placeholder')
                                            }
                                            type="text"
                                            disabled={!user}
                                            required
                                        />
                                        {replyTo && (
                                            <div
                                                className={styles.replyTo}
                                                onClick={() => {
                                                    setReplyTo(undefined);
                                                }}
                                            >
                                                {trans('article_detail.comments.replying').replace(
                                                    '{name}',
                                                    `${replyTo?.user.firstName} ${replyTo?.user.lastName}`,
                                                )}
                                            </div>
                                        )}
                                        <Button
                                            submit
                                            disabled={commentLoading || !commentContent}
                                            className={styles.submitButton}
                                        >
                                            <span>{trans('article_detail.comments.submit')}</span>
                                        </Button>
                                    </div>
                                </form>
                                {sortedComments?.length === 0 && (
                                    <p className={styles.noResults}>
                                        {trans('article_detail.comments.no_comments_yet')}
                                    </p>
                                )}
                                {sortedComments?.map((comment) => (
                                    <Comment
                                        key={comment.id}
                                        article={article}
                                        comment={comment}
                                        votesLoading={votesLoading}
                                        setReplyTo={setReplyTo}
                                        user={user}
                                        setVote={setVote}
                                    />
                                ))}
                            </>
                        )}
                    </div>
                </div>
                <div className={styles.related}>
                    <h2>{trans('article_detail.related_articles.title')}</h2>
                    {relatedArticles.map((related) => (
                        <div key={related.id} className={styles.relatedArticle}>
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
