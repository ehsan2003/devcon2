export type {IUser} from '@models/User';
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
    MULTER_ERROR = 'MULTER_ERROR',
    USER_LOGIN_INVALID_PASSWORD = 'USER_LOGIN_INVALID_PASSWORD',
    USER_LOGIN_INVALID_EMAIL = 'USER_LOGIN_INVALID_EMAIL',
    USER_REGISTER_DUPLICATE = 'USER_REGISTER_DUPLICATE',
    USER_VERIFICATION_INVALID_TOKEN = 'USER_VERIFICATION_INVALID_TOKEN',
    USER_VERIFICATION_DUPLICATE_VERIFICATION_DATA = 'USER_VERIFICATION_DUPLICATE_VERIFICATION_DATA',
    USER_RESET_PASSWORD_USER_NOT_FOUND = 'USER_RESET_PASSWORD_USER_NOT_FOUND',
    USER_RESET_PASSWORD_INVALID_TOKEN = 'USER_RESET_PASSWORD_INVALID_TOKEN',
    USER_CHANGE_PASSWORD_INVALID = 'USER_CHANGE_PASSWORD_INVALID',
    USER_CHANGE_ROLE_FORBIDDEN = 'USER_CHANGE_ROLE_FORBIDDEN',
    USER_CHANGE_ROLE_USER_NOT_FOUND = 'USER_CHANGE_ROLE_USER_NOT_FOUND',
    TAGS_INSERT_DUPLICATE_SLUG = 'TAGS_INSERT_DUPLICATE_SLUG',
    TAGS_DELETE_NOT_FOUND = 'TAGS_DELETE_NOT_FOUND',
    TAGS_SEARCH_TAG_NOT_FOUND = 'TAGS_SEARCH_TAG_NOT_FOUND',
    CATEGORIES_INSERT_DUPLICATE_SLUG = 'CATEGORIES_INSERT_DUPLICATE_SLUG',
    CATEGORIES_UPDATE_CATEGORY_NOT_FOUND = 'CATEGORIES_UPDATE_CATEGORY_NOT_FOUND',
    CATEGORIES_DELETE_CATEGORY_NOT_FOUND = 'CATEGORIES_DELETE_CATEGORY_NOT_FOUND',
    CATEGORIES_DELETE_DEPENDENCY_ERROR = 'CATEGORIES_DELETE_DEPENDENCY_ERROR',
    CATEGORIES_SEARCH_NOT_FOUND = 'CATEGORIES_SEARCH_NOT_FOUND',
    COMMENTS_INSERT_AUTHORIZED = 'COMMENTS_INSERT_AUTHORIZED',
    COMMENTS_INSERT_RELATION_ERROR = 'COMMENTS_INSERT_RELATION_ERROR',
    COMMENTS_INSERT_UNAUTHORIZED_RELATION_ERROR = 'COMMENTS_INSERT_UNAUTHORIZED_RELATION_ERROR',
    COMMENTS_INSERT_UNAUTHORIZED_RESPONSE_TO_NOT_FOUND = 'COMMENTS_INSERT_UNAUTHORIZED_RESPONSE_TO_NOT_FOUND',
    COMMENTS_GET_POST_COMMENTS_NOT_FOUND = 'COMMENTS_GET_POST_COMMENTS_NOT_FOUND',
    COMMENTS_GET_RESPONSES_NOT_FOUND = 'COMMENTS_GET_RESPONSES_NOT_FOUND',
    POST_INSERT_DUPLICATE_SLUG = 'POST_INSERT_DUPLICATE_SLUG',
    POST_UPDATE_POST_NOT_FOUND = 'POST_UPDATE_POST_NOT_FOUND',
    POST_UPDATE_ACCESS_FORBIDDEN = 'POST_UPDATE_ACCESS_FORBIDDEN',
    POSTS_UPDATE_DUPLICATE_SLUG = 'POSTS_UPDATE_DUPLICATE_SLUG',
    POSTS_DELETE_NOT_FOUND = 'POSTS_DELETE_NOT_FOUND',
    POSTS_DELETE_ACCESS_FORBIDDEN = 'POSTS_DELETE_ACCESS_FORBIDDEN',
    POSTS_VISIBLE_ACCESS_FORBIDDEN = 'POSTS_VISIBLE_ACCESS_FORBIDDEN',
    POSTS_VISIBLE_POST_NOT_FOUND = 'POSTS_VISIBLE_POST_NOT_FOUND',
    POSTS_GET_NOT_FOUND = 'POSTS_GET_NOT_FOUND',
    POST_LIKE_ALREADY_LIKED = 'POST_LIKE_ALREADY_LIKED',
    POST_LIKE_NOT_FOUND = 'POST_LIKE_NOT_FOUND',
    POST_DISLIKE_ALREADY_LIKED = 'POST_DISLIKE_ALREADY_LIKED',
    POST_DISLIKE_NOT_FOUND = 'POST_DISLIKE_NOT_FOUND',
    POSTS_SEARCH_CATEGORY_NOT_FOUND = 'POSTS_SEARCH_CATEGORY_NOT_FOUND',
    PROFILE_CREATE_ALREADY_EXISTS = 'PROFILE_CREATE_ALREADY_EXISTS',
    PROFILE_CREATE_DUPLICATE_SLUG = 'PROFILE_CREATE_DUPLICATE_SLUG',
    PROFILES_GET_SLUG_NOT_FOUND = 'PROFILES_GET_SLUG_NOT_FOUND',
    PROFILE_GET_ID_NOT_FOUND = 'PROFILE_GET_ID_NOT_FOUND',
    PROFILE_UPDATE_NOT_FOUND = 'PROFILE_UPDATE_NOT_FOUND',
    IMAGES_CHANGE_SLUG_NOT_FOUND = 'IMAGES_CHANGE_SLUG_NOT_FOUND',
    IMAGES_CHANGE_ACCESS_NOT_FOUND = 'IMAGES_CHANGE_ACCESS_NOT_FOUND',
    IMAGES_DATA_NOT_FOUND = 'IMAGES_DATA_NOT_FOUND',
    IMAGES_REMOVE_NOT_FOUND = 'IMAGES_REMOVE_NOT_FOUND',
    CHANGE_INFO_NOT_FOUND = 'CHANGE_INFO_NOT_FOUND',
    UPLOAD_IMAGE_POST_NOT_FOUND = 'UPLOAD_IMAGE_POST_NOT_FOUND',
    UPLOAD_IMAGE_PROFILE_NOT_FOUND = 'UPLOAD_IMAGE_PROFILE_NOT_FOUND',
    UPLOAD_IMAGE_AVATAR_NO_FILE = 'UPLOAD_IMAGE_AVATAR_NO_FILE',
    UPLOAD_IMAGE_POST_UPDATE_NOT_FOUND = 'UPLOAD_IMAGE_POST_UPDATE_NOT_FOUND',
    UPLOAD_IMAGE_POST_UPDATE_NO_FILE = 'UPLOAD_IMAGE_POST_UPDATE_NO_FILE',
    FILE_PROTECTION_FILE_INACCESSIBLE = 'FILE_PROTECTION_FILE_INACCESSIBLE',
    AUTHORIZATION_USER_NOT_FOUND = 'AUTHORIZATION_USER_NOT_FOUND',
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