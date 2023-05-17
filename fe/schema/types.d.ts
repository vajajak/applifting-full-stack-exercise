export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Article = {
  __typename?: 'Article';
  commentCount: Scalars['Float'];
  comments: Array<Comment>;
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  featuredImage?: Maybe<MediaObject>;
  /** An unique UUID of an article */
  id: Scalars['ID'];
  perex: Scalars['String'];
  slug: Scalars['String'];
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: User;
  userId: Scalars['ID'];
};


export type ArticleCommentsArgs = {
  filter?: InputMaybe<CommentFilter>;
  sorting?: InputMaybe<Array<CommentSort>>;
};

export type ArticleConnection = {
  __typename?: 'ArticleConnection';
  /** Array of nodes. */
  nodes: Array<Article>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int'];
};

export type ArticleDeleteResponse = {
  __typename?: 'ArticleDeleteResponse';
  commentCount?: Maybe<Scalars['Float']>;
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  /** An unique UUID of an article */
  id?: Maybe<Scalars['ID']>;
  perex?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  userId?: Maybe<Scalars['ID']>;
};

export type ArticleFilter = {
  and?: InputMaybe<Array<ArticleFilter>>;
  commentCount?: InputMaybe<NumberFieldComparison>;
  comments?: InputMaybe<ArticleFilterCommentFilter>;
  content?: InputMaybe<StringFieldComparison>;
  createdAt?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ArticleFilter>>;
  perex?: InputMaybe<StringFieldComparison>;
  slug?: InputMaybe<StringFieldComparison>;
  title?: InputMaybe<StringFieldComparison>;
  updatedAt?: InputMaybe<DateFieldComparison>;
  userId?: InputMaybe<IdFilterComparison>;
};

export type ArticleFilterCommentFilter = {
  and?: InputMaybe<Array<ArticleFilterCommentFilter>>;
  articleId?: InputMaybe<StringFieldComparison>;
  content?: InputMaybe<StringFieldComparison>;
  createdAt?: InputMaybe<DateFieldComparison>;
  downVotes?: InputMaybe<NumberFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ArticleFilterCommentFilter>>;
  upVotes?: InputMaybe<NumberFieldComparison>;
  voted?: InputMaybe<VoteTypeFilterComparison>;
};

export type ArticleSort = {
  direction: SortDirection;
  field: ArticleSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ArticleSortFields {
  CommentCount = 'commentCount',
  Content = 'content',
  CreatedAt = 'createdAt',
  Id = 'id',
  Perex = 'perex',
  Slug = 'slug',
  Title = 'title',
  UpdatedAt = 'updatedAt',
  UserId = 'userId'
}

export type Comment = {
  __typename?: 'Comment';
  article: Article;
  articleId: Scalars['String'];
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  downVotes: Scalars['Float'];
  id: Scalars['ID'];
  parent?: Maybe<Comment>;
  upVotes: Scalars['Float'];
  user: User;
  voted?: Maybe<VoteType>;
};

export type CommentFilter = {
  and?: InputMaybe<Array<CommentFilter>>;
  article?: InputMaybe<CommentFilterArticleFilter>;
  articleId?: InputMaybe<StringFieldComparison>;
  content?: InputMaybe<StringFieldComparison>;
  createdAt?: InputMaybe<DateFieldComparison>;
  downVotes?: InputMaybe<NumberFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<CommentFilter>>;
  upVotes?: InputMaybe<NumberFieldComparison>;
  voted?: InputMaybe<VoteTypeFilterComparison>;
};

export type CommentFilterArticleFilter = {
  and?: InputMaybe<Array<CommentFilterArticleFilter>>;
  commentCount?: InputMaybe<NumberFieldComparison>;
  content?: InputMaybe<StringFieldComparison>;
  createdAt?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<CommentFilterArticleFilter>>;
  perex?: InputMaybe<StringFieldComparison>;
  slug?: InputMaybe<StringFieldComparison>;
  title?: InputMaybe<StringFieldComparison>;
  updatedAt?: InputMaybe<DateFieldComparison>;
  userId?: InputMaybe<IdFilterComparison>;
};

export type CommentSort = {
  direction: SortDirection;
  field: CommentSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum CommentSortFields {
  ArticleId = 'articleId',
  Content = 'content',
  CreatedAt = 'createdAt',
  DownVotes = 'downVotes',
  Id = 'id',
  UpVotes = 'upVotes',
  Voted = 'voted'
}

export type CommentSubscriptionFilter = {
  and?: InputMaybe<Array<CommentSubscriptionFilter>>;
  articleId?: InputMaybe<StringFieldComparison>;
  content?: InputMaybe<StringFieldComparison>;
  createdAt?: InputMaybe<DateFieldComparison>;
  downVotes?: InputMaybe<NumberFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<CommentSubscriptionFilter>>;
  upVotes?: InputMaybe<NumberFieldComparison>;
  voted?: InputMaybe<VoteTypeFilterComparison>;
};

export type CreateArticleInput = {
  content: Scalars['String'];
  featuredImageId?: InputMaybe<Scalars['ID']>;
  perex: Scalars['String'];
  title: Scalars['String'];
};

export type CreateCommentInput = {
  articleId: Scalars['ID'];
  content: Scalars['String'];
  parentId?: InputMaybe<Scalars['ID']>;
};

export type CreateCommentSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: CommentSubscriptionFilter;
};

export type CreateOneArticleInput = {
  /** The record to create */
  article: CreateArticleInput;
};

export type CreateOneCommentInput = {
  /** The record to create */
  comment: CreateCommentInput;
};

export type CreateOneUserInput = {
  /** The record to create */
  user: CreateUserInput;
};

export type CreateUserInput = {
  avatarId?: InputMaybe<Scalars['ID']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  passwordConfirm: Scalars['String'];
};

export type DateFieldComparison = {
  between?: InputMaybe<DateFieldComparisonBetween>;
  eq?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  is?: InputMaybe<Scalars['Boolean']>;
  isNot?: InputMaybe<Scalars['Boolean']>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  neq?: InputMaybe<Scalars['DateTime']>;
  notBetween?: InputMaybe<DateFieldComparisonBetween>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type DateFieldComparisonBetween = {
  lower: Scalars['DateTime'];
  upper: Scalars['DateTime'];
};

export type DeleteOneArticleInput = {
  /** The id of the record to delete. */
  id: Scalars['ID'];
};

export type IdFilterComparison = {
  eq?: InputMaybe<Scalars['ID']>;
  gt?: InputMaybe<Scalars['ID']>;
  gte?: InputMaybe<Scalars['ID']>;
  iLike?: InputMaybe<Scalars['ID']>;
  in?: InputMaybe<Array<Scalars['ID']>>;
  is?: InputMaybe<Scalars['Boolean']>;
  isNot?: InputMaybe<Scalars['Boolean']>;
  like?: InputMaybe<Scalars['ID']>;
  lt?: InputMaybe<Scalars['ID']>;
  lte?: InputMaybe<Scalars['ID']>;
  neq?: InputMaybe<Scalars['ID']>;
  notILike?: InputMaybe<Scalars['ID']>;
  notIn?: InputMaybe<Array<Scalars['ID']>>;
  notLike?: InputMaybe<Scalars['ID']>;
};

export type MediaObject = {
  __typename?: 'MediaObject';
  blurhash: Scalars['String'];
  createdAt: Scalars['DateTime'];
  height: Scalars['Float'];
  id: Scalars['ID'];
  path: Scalars['String'];
  type: MediaObjectType;
  updatedAt?: Maybe<Scalars['DateTime']>;
  width: Scalars['Float'];
};

export enum MediaObjectType {
  Image = 'image'
}

export type Mutation = {
  __typename?: 'Mutation';
  createOneArticle: Article;
  createOneComment: Comment;
  createOneUser: User;
  deleteOneArticle: ArticleDeleteResponse;
  setVote: Vote;
  updateOneArticle: Article;
};


export type MutationCreateOneArticleArgs = {
  input: CreateOneArticleInput;
};


export type MutationCreateOneCommentArgs = {
  input: CreateOneCommentInput;
};


export type MutationCreateOneUserArgs = {
  input: CreateOneUserInput;
};


export type MutationDeleteOneArticleArgs = {
  input: DeleteOneArticleInput;
};


export type MutationSetVoteArgs = {
  commentId: Scalars['ID'];
  voteType: VoteType;
};


export type MutationUpdateOneArticleArgs = {
  input: UpdateOneArticleInput;
};

export type NumberFieldComparison = {
  between?: InputMaybe<NumberFieldComparisonBetween>;
  eq?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  is?: InputMaybe<Scalars['Boolean']>;
  isNot?: InputMaybe<Scalars['Boolean']>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  neq?: InputMaybe<Scalars['Float']>;
  notBetween?: InputMaybe<NumberFieldComparisonBetween>;
  notIn?: InputMaybe<Array<Scalars['Float']>>;
};

export type NumberFieldComparisonBetween = {
  lower: Scalars['Float'];
  upper: Scalars['Float'];
};

export type OffsetPageInfo = {
  __typename?: 'OffsetPageInfo';
  /** true if paging forward and there are more records. */
  hasNextPage?: Maybe<Scalars['Boolean']>;
  /** true if paging backwards and there are more records. */
  hasPreviousPage?: Maybe<Scalars['Boolean']>;
};

export type OffsetPaging = {
  /** Limit the number of records returned */
  limit?: InputMaybe<Scalars['Int']>;
  /** Offset to start returning records from */
  offset?: InputMaybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  article: Article;
  articles: ArticleConnection;
  comment: Comment;
  comments: Array<Comment>;
};


export type QueryArticleArgs = {
  id: Scalars['ID'];
};


export type QueryArticlesArgs = {
  filter?: InputMaybe<ArticleFilter>;
  paging?: InputMaybe<OffsetPaging>;
  sorting?: InputMaybe<Array<ArticleSort>>;
};


export type QueryCommentArgs = {
  id: Scalars['ID'];
};


export type QueryCommentsArgs = {
  filter?: InputMaybe<CommentFilter>;
  sorting?: InputMaybe<Array<CommentSort>>;
};

/** Sort Directions */
export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

/** Sort Nulls Options */
export enum SortNulls {
  NullsFirst = 'NULLS_FIRST',
  NullsLast = 'NULLS_LAST'
}

export type StringFieldComparison = {
  eq?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  iLike?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  is?: InputMaybe<Scalars['Boolean']>;
  isNot?: InputMaybe<Scalars['Boolean']>;
  like?: InputMaybe<Scalars['String']>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  neq?: InputMaybe<Scalars['String']>;
  notILike?: InputMaybe<Scalars['String']>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  notLike?: InputMaybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  createdComment: Comment;
};


export type SubscriptionCreatedCommentArgs = {
  input?: InputMaybe<CreateCommentSubscriptionFilterInput>;
};

export type UpdateArticleInput = {
  content?: InputMaybe<Scalars['String']>;
  featuredImageId?: InputMaybe<Scalars['ID']>;
  perex?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateOneArticleInput = {
  /** The id of the record to update */
  id: Scalars['ID'];
  /** The update to apply. */
  update: UpdateArticleInput;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<MediaObject>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type Vote = {
  __typename?: 'Vote';
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export enum VoteType {
  Down = 'down',
  Up = 'up'
}

export type VoteTypeFilterComparison = {
  eq?: InputMaybe<VoteType>;
  gt?: InputMaybe<VoteType>;
  gte?: InputMaybe<VoteType>;
  iLike?: InputMaybe<VoteType>;
  in?: InputMaybe<Array<VoteType>>;
  is?: InputMaybe<Scalars['Boolean']>;
  isNot?: InputMaybe<Scalars['Boolean']>;
  like?: InputMaybe<VoteType>;
  lt?: InputMaybe<VoteType>;
  lte?: InputMaybe<VoteType>;
  neq?: InputMaybe<VoteType>;
  notILike?: InputMaybe<VoteType>;
  notIn?: InputMaybe<Array<VoteType>>;
  notLike?: InputMaybe<VoteType>;
};
