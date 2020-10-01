export type {IProfile} from '@models/Profile';
export type {IImageData} from '@models/ImageData';
export type {IVerification} from '@models/Verification';
export type {IPost} from '@models/Post';
export type {ITag} from '@models/Tag';
export type {IComment} from '@models/Comment';
export type {ICategory} from '@models/Category';

export enum Codes {
    UNKNOWN_SERVER_ERROR = 'UNKNOWN_SERVER_ERROR',
    VALIDATION_ERROR = 'VALIDATION_ERROR',
    ROUTE_INACCESSIBLE = 'ROUTE_INACCESSIBLE',
    ROUTE_DOES_NOT_EXISTS = 'ROUTE_DOES_NOT_EXISTS',
    FILE_UPLOAD_ERROR = 'FILE_UPLOAD_ERROR',
    USER_LOGIN_$_INVALID_PASSWORD = 'USER_LOGIN_$_INVALID_PASSWORD',
    USER_LOGIN_$_INVALID_EMAIL = 'USER_LOGIN_$_INVALID_EMAIL',
    USER_REGISTER_$_DUPLICATE = 'USER_REGISTER_$_DUPLICATE',
    USER_VERIFICATION_$_INVALID_TOKEN = 'USER_VERIFICATION_$_INVALID_TOKEN',
    USER_VERIFICATION_$_DUPLICATE_VERIFICATION_DATA = 'USER_VERIFICATION_$_DUPLICATE_VERIFICATION_DATA',
    USER_RESET_PASSWORD_$_USER_NOT_FOUND = 'USER_RESET_PASSWORD_$_USER_NOT_FOUND',
    USER_RESET_PASSWORD_$_INVALID_TOKEN = 'USER_RESET_PASSWORD_$_INVALID_TOKEN',
    USER_CHANGE_PASSWORD_$_INVALID_PASSWORD = 'USER_CHANGE_PASSWORD_$_INVALID_PASSWORD',
    USER_CHANGE_ROLE_$_FORBIDDEN = 'USER_CHANGE_ROLE_$_FORBIDDEN',
    USER_CHANGE_ROLE_$_USER_NOT_FOUND = 'USER_CHANGE_ROLE_$_USER_NOT_FOUND',
    TAGS_INSERT_$_DUPLICATE_SLUG = 'TAGS_INSERT_$_DUPLICATE_SLUG',
    TAGS_DELETE_$_NOT_FOUND = 'TAGS_DELETE_$_NOT_FOUND',
    TAGS_SEARCH_$_TAG_NOT_FOUND = 'TAGS_SEARCH_$_TAG_NOT_FOUND',
    CATEGORIES_INSERT_$_DUPLICATE_SLUG = 'CATEGORIES_INSERT_$_DUPLICATE_SLUG',
    CATEGORIES_UPDATE_$_CATEGORY_NOT_FOUND = 'CATEGORIES_UPDATE_$_CATEGORY_NOT_FOUND',
    CATEGORIES_DELETE_$_CATEGORY_NOT_FOUND = 'CATEGORIES_DELETE_$_CATEGORY_NOT_FOUND',
    CATEGORIES_DELETE_$_DEPENDENCY_ERROR = 'CATEGORIES_DELETE_$_DEPENDENCY_ERROR',
    CATEGORIES_SEARCH_$_NOT_FOUND = 'CATEGORIES_SEARCH_$_NOT_FOUND',
    COMMENTS_INSERT_AUTHORIZED_$_PARENT_NOT_FOUND = 'COMMENTS_INSERT_AUTHORIZED_$_PARENT_NOT_FOUND',
    COMMENTS_INSERT_AUTHORIZED_$_POST_CONFLICT = 'COMMENTS_INSERT_AUTHORIZED_$_POST_CONFLICT',
    COMMENTS_INSERT_UNAUTHORIZED_$_POST_CONFLICT = 'COMMENTS_INSERT_UNAUTHORIZED_$_POST_CONFLICT',
    COMMENTS_INSERT_UNAUTHORIZED_$_PARENT_NOT_FOUND = 'COMMENTS_INSERT_UNAUTHORIZED_$_PARENT_NOT_FOUND',
    COMMENTS_GET_POST_$_COMMENTS_NOT_FOUND = 'COMMENTS_GET_POST_$_COMMENTS_NOT_FOUND',
    COMMENTS_GET_RESPONSES_$_NOT_FOUND = 'COMMENTS_GET_RESPONSES_$_NOT_FOUND',
    POSTS_INSERT_$_DUPLICATE_SLUG = 'POSTS_INSERT_$_DUPLICATE_SLUG',
    POST_UPDATE_$_POST_NOT_FOUND = 'POST_UPDATE_$_POST_NOT_FOUND',
    POST_UPDATE_$_ACCESS_FORBIDDEN = 'POST_UPDATE_$_ACCESS_FORBIDDEN',
    POST_UPDATE_$_DUPLICATE_SLUG = 'POST_UPDATE_$_DUPLICATE_SLUG',
    POST_DELETE_$_NOT_FOUND = 'POST_DELETE_$_NOT_FOUND',
    POST_DELETE_$_ACCESS_FORBIDDEN = 'POST_DELETE_$_ACCESS_FORBIDDEN',
    POST_VISIBLE_$_ACCESS_FORBIDDEN = 'POST_VISIBLE_$_ACCESS_FORBIDDEN',
    POST_VISIBLE_$_POST_NOT_FOUND = 'POST_VISIBLE_$_POST_NOT_FOUND',
    POSTS_GET_$_NOT_FOUND = 'POSTS_GET_$_NOT_FOUND',
    POSTS_LIKE_$_ALREADY_LIKED = 'POSTS_LIKE_$_ALREADY_LIKED',
    POSTS_LIKE_$_NOT_FOUND = 'POSTS_LIKE_$_NOT_FOUND',
    POSTS_DISLIKE_$_ALREADY_LIKED = 'POSTS_DISLIKE_$_ALREADY_LIKED',
    POSTS_DISLIKE_$_NOT_FOUND = 'POSTS_DISLIKE_$_NOT_FOUND',
    POSTS_SEARCH_CATEGORY_$_NOT_FOUND = 'POSTS_SEARCH_CATEGORY_$_NOT_FOUND',
    PROFILE_CREATE_$_ALREADY_EXISTS = 'PROFILE_CREATE_$_ALREADY_EXISTS',
    PROFILE_CREATE_$_DUPLICATE_SLUG = 'PROFILE_CREATE_$_DUPLICATE_SLUG',
    PROFILE_GET_$_SLUG_NOT_FOUND = 'PROFILE_GET_$_SLUG_NOT_FOUND',
    PROFILE_GET_$_ID_NOT_FOUND = 'PROFILE_GET_$_ID_NOT_FOUND',
    PROFILE_UPDATE_$_NOT_FOUND = 'PROFILE_UPDATE_$_NOT_FOUND',
    IMAGES_CHANGE_SLUG_$_NOT_FOUND = 'IMAGES_CHANGE_SLUG_$_NOT_FOUND',
    IMAGES_CHANGE_ACCESS_$_NOT_FOUND = 'IMAGES_CHANGE_ACCESS_$_NOT_FOUND',
    IMAGES_DATA_$_NOT_FOUND = 'IMAGES_DATA_$_NOT_FOUND',
    IMAGES_REMOVE_$_NOT_FOUND = 'IMAGES_REMOVE_$_NOT_FOUND',
    CHANGE_INFO_$_NOT_FOUND = 'CHANGE_INFO_$_NOT_FOUND',
    UPLOAD_IMAGE_POST_$_NOT_FOUND = 'UPLOAD_IMAGE_POST_$_NOT_FOUND',
    UPLOAD_IMAGE_AVATAR_$_NOT_FOUND = 'UPLOAD_IMAGE_AVATAR_$_NOT_FOUND',
    UPLOAD_IMAGE_AVATAR_$_NO_FILE = 'UPLOAD_IMAGE_AVATAR_$_NO_FILE',
    UPLOAD_IMAGE_POST_UPDATE_$_NOT_FOUND = 'UPLOAD_IMAGE_POST_UPDATE_$_NOT_FOUND',
    UPLOAD_IMAGE_POST_UPDATE_$_NO_FILE = 'UPLOAD_IMAGE_POST_UPDATE_$_NO_FILE',
    FILE_PROTECTION_$_FILE_INACCESSIBLE = 'FILE_PROTECTION_$_FILE_INACCESSIBLE',
    AUTHORIZATION_$_USER_NOT_FOUND = 'AUTHORIZATION_$_USER_NOT_FOUND',
}

export type {ImagesChangeAccessRequestHandler} from '../routes/api/v1/images/change-access';
export type {ImagesChangeInfoRequestHandler} from '../routes/api/v1/images/change-info';
export type {ImagesSearchRequestHandler} from '../routes/api/v1/images/search';
export type {ImagesChangeSlugRequestHandler} from '../routes/api/v1/images/change-slug';
export type {ImagesDataRequestHandler} from '../routes/api/v1/images/data';
export type {ImagesRemoveRequestHandler} from '../routes/api/v1/images/remove';
export type {
    CommentsInsertUnauthorizedRequestHandler
} from '../routes/api/v1/comments/insert-unauthorized';
export type {CommentsInsertAuthorizedRequestHandler} from '../routes/api/v1/comments/insert-authorized';
export type {CommentsUpdateRequestHandler} from '../routes/api/v1/comments/update';
export type {CommentsGetResponsesRequestHandler} from '../routes/api/v1/comments/get-responses';
export type {CommentsGetPostRequestHandler} from '../routes/api/v1/comments/get-post';
export type {CommentsVisibleRequestHandler} from '../routes/api/v1/comments/visible';
export type {CommentsRemoveRequestHandler} from '../routes/api/v1/comments/remove';
export type {UsersLoginRequestHandler} from '../routes/api/v1/users/login';
export type {UsersCurrentRequestHandler} from '../routes/api/v1/users/current';
export type {UsersVerifyTokenRequestHandler} from '../routes/api/v1/users/verify-token';
export type {UsersResetPasswordSendRequestHandler} from '../routes/api/v1/users/reset-password-send';
export type {UsersResetPasswordTokenRequestHandler} from '../routes/api/v1/users/reset-password-token';
export type {UsersRegisterRequestHandler} from '../routes/api/v1/users/register';
export type {UsersVerifySendRequestHandler} from '../routes/api/v1/users/verify-send';
export type {UsersChangePasswordRequestHandler} from '../routes/api/v1/users/change-password';
export type {UsersChangeRolsRequestHandler} from '../routes/api/v1/users/change-rols';
export type {PostsInsertRequestHandler} from '../routes/api/v1/posts/insert';
export type {PostsDislikeRequestHandler} from '../routes/api/v1/posts/dislike';
export type {PostsSearchCategoryRequestHandler} from '../routes/api/v1/posts/search-category';
export type {PostsUpdateRequestHandler} from '../routes/api/v1/posts/update';
export type {PostsSearchRequestHandler} from '../routes/api/v1/posts/search';
export type {PostsGetRequestHandler} from '../routes/api/v1/posts/get';
export type {PostsVisibleRequestHandler} from '../routes/api/v1/posts/visible';
export type {PostsLikeRequestHandler} from '../routes/api/v1/posts/like';
export type {PostsDeleteRequestHandler} from '../routes/api/v1/posts/delete';
export type {TagsInsertRequestHandler} from '../routes/api/v1/tags/insert';
export type {TagsSearchRequestHandler} from '../routes/api/v1/tags/search';
export type {TagsDeleteRequestHandler} from '../routes/api/v1/tags/delete';
export type {ProfilesGetSlugRequestHandler} from '../routes/api/v1/profiles/get-slug';
export type {ProfilesCreateRequestHandler} from '../routes/api/v1/profiles/create';
export type {ProfilesUpdateRequestHandler} from '../routes/api/v1/profiles/update';
export type {ProfilesGetIdRequestHandler} from '../routes/api/v1/profiles/get-id';
export type {CategoriesInsertRequestHandler} from '../routes/api/v1/categories/insert';
export type {CategoriesAllRequestHandler} from '../routes/api/v1/categories/all';
export type {CategoriesChangeParentRequestHandler} from '../routes/api/v1/categories/change-parent';
export type {CategoriesUpdateRequestHandler} from '../routes/api/v1/categories/update';
export type {UploadImagePostRequestHandler} from '../routes/upload/image/post';
export type {UploadImagePostUpdateRequestHandler} from '../routes/upload/image/post-update';
export type {UploadImageAvatarRequestHandler} from '../routes/upload/image/avatar';