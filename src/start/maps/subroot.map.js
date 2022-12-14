
export default 
{
    "app" : () => import("^/src/app/subroot.vue"),
    "app.account" : () => import("^/src/app/@modules/account/subroot.vue"),
    "app.auth" : () => import("^/src/app/@modules/auth/subroot.vue"),
    "app.auth.log_in" : () => import("^/src/app/@modules/auth/@modules/log_in/subroot.vue"),
    "app.auth.sign_up" : () => import("^/src/app/@modules/auth/@modules/sign_up/subroot.vue"),
    "app.chat" : () => import("^/src/app/@modules/chat/subroot.vue"),
    "app.chat.av_call" : () => import("^/src/app/@modules/chat/@modules/av_call/subroot.vue"),
    "app.chat.messages" : () => import("^/src/app/@modules/chat/@modules/messages/subroot.vue"),
    "app.chat.settings" : () => import("^/src/app/@modules/chat/@modules/settings/subroot.vue"),
    "app.friendships" : () => import("^/src/app/@modules/friendships/subroot.vue"),
    "app.friendships.blocks" : () => import("^/src/app/@modules/friendships/@modules/blocks/subroot.vue"),
    "app.friendships.requests" : () => import("^/src/app/@modules/friendships/@modules/requests/subroot.vue"),
    "app.friendships.suggestions" : () => import("^/src/app/@modules/friendships/@modules/suggestions/subroot.vue"),
    "app.groups" : () => import("^/src/app/@modules/groups/subroot.vue"),
    "app.groups.control_panel" : () => import("^/src/app/@modules/groups/@modules/control_panel/subroot.vue"),
    "app.groups.posts" : () => import("^/src/app/@modules/groups/@modules/posts/subroot.vue"),
    "app.groups.posts.comments" : () => import("^/src/app/@modules/groups/@modules/posts/@modules/comments/subroot.vue"),
    "app.groups.posts.comments.replies" : () => import("^/src/app/@modules/groups/@modules/posts/@modules/comments/@modules/replies/subroot.vue"),
    "app.installer" : () => import("^/src/app/@modules/installer/subroot.vue"),
    "app.newsfeed" : () => import("^/src/app/@modules/newsfeed/subroot.vue"),
    "app.profile" : () => import("^/src/app/@modules/profile/subroot.vue"),
    "app.profile.editor" : () => import("^/src/app/@modules/profile/@modules/editor/subroot.vue"),
    "app.profile.friends" : () => import("^/src/app/@modules/profile/@modules/friends/subroot.vue"),
    "app.profile.gallery" : () => import("^/src/app/@modules/profile/@modules/gallery/subroot.vue"),
    "app.profile.history" : () => import("^/src/app/@modules/profile/@modules/history/subroot.vue"),
    "app.profile.notes" : () => import("^/src/app/@modules/profile/@modules/notes/subroot.vue"),
}