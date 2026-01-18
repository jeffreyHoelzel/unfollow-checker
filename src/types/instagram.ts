/**
 * Represents follower and following analytics derived from a user's Instagram account.
 *
 * @typedef InstagramFollowReport
 *
 * @property {string[]} followers List of usernames that follow the user.
 * @property {string[]} following List of usernames that the user follows.
 * @property {string[]} notFollowingBack Usernames that the user follows who do not follow the user back.
 * @property {Object} stats Aggregated statistics related to the follower data.
 * @property {number} stats.followerCount Total number of followers.
 * @property {number} stats.followingCount Total number of accounts the user follows.
 * @property {number} stats.notFollowingBackCount Number of users not following the user back.
 * @property {number} stats.followerFilesFound Number of follower data files successfully processed.
 * @property {number} stats.followingFilesFound Number of following data files successfully processed.
 */
export type InstagramFollowReport = {
  followers: string[];
  following: string[];
  notFollowingBack: string[];
  stats: {
    followerCount: number;
    followingCount: number;
    notFollowingBackCount: number;
    followerFilesFound: number;
    followingFilesFound: number;
  };
};
