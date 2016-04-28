'use strict';

export default function formatTweetText(originalText, entities) {
  var text = entities.hashtags.reduce((text, hashtag) =>
      text.replace('#' + hashtag.text, `<span class="hashtag">#${hashtag.text}</span>`)
    , originalText);

  text = entities.user_mentions.reduce((text, mention) =>
      text.replace('@' + mention.screen_name, `<span class="hashtag">@${mention.screen_name}</span>`)
    , text);

  text = entities.urls.reduce((text, url) =>
      text.replace(url.url, `<span class="hashtag"><a href="${url.expanded_url}" target="_blank">${url.display_url}</a></span>`)
    , text);

  text = text.replace(/^RT/, '<i class="fa fa-retweet" aria-hidden="true"></i>');

  return text;
}