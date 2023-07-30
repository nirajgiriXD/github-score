$(document).ready(() => {
    const userContainer = $('#gh-profile__container');
    const userProfile = $('#gh-user-profile-img');
    const userProfileName = $('#gh-user-profile-name');
    const userProfileCreated = $('#gh-iser-profile-created');
    const userProfileLink = $('#gh-user-profile-link');
    const userProfileFollowers = $('#gh-user-profile-followers');
    const userProfileFollowing = $('#gh-user-profile-following');
    const userProfileGists = $('#gh-user-profile-gists');
    const userProfileRepositories = $('#gh-user-profile-repositories');
    const userProfileScore = $('#gh-user-profile-score');

    const query = $('#query');
    const searchBtn = $('#search-btn');
    searchBtn.click((e) => {
        e.preventDefault();
        username = query.val();
        if ('' !== username) {
            $.ajax({
                url: 'https://api.github.com/users/' + username,
                type: 'GET',
                success: (response) => {
                    updateUserData(response);
                },
                error: (response) => {
                    console.log(response);
                }
            });
        }
    });

    function calculateGitHubScore(followers, gists, repos) {
        return followers + gists + repos;
    }

    function updateUserData(data) {
        userProfile.attr("src", data.avatar_url);
        userProfileLink.attr("href", data.html_url);
        userProfileName.text(data.name);
        userProfileCreated.text(data.created_at.substring(0, 10));
        userProfileFollowers.text(data.followers);
        userProfileFollowing.text(data.following);
        userProfileGists.text(data.public_gists);
        userProfileRepositories.text(data.public_repos);
        userProfileScore.text(calculateGitHubScore(data.followers, data.public_gists, data.public_repos));
        userContainer.css("display", "block");
    }
});