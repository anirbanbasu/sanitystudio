import { defineType } from 'sanity'
import { IoShareSocialOutline } from "react-icons/io5";
import { Si500Px, SiAcademia, SiArtstation, SiBehance, SiBitbucket, SiDribbble, SiEtsy, SiFacebook, SiFlickr, SiGithub, SiGitlab, SiGoodreads, SiGooglescholar, SiInstagram, SiLinkedin, SiMedium, SiOrcid, SiPatreon, SiPinterest, SiReddit, SiResearchgate, SiSketchfab, SiSnapchat, SiSoundcloud, SiSpotify, SiStackexchange, SiStackoverflow, SiTiktok, SiTumblr, SiTwitch, SiTwitter, SiVimeo, SiWordpress, SiYoutube, SiZotero } from "react-icons/si";
import { IconType } from 'react-icons';


const knownSocialLinks = [ 
    {title: '500px', value: '500px'},
    {title: 'Academia.edu', value: 'academia'},
    {title: 'Artstation', value: 'artstation'},
    {title: 'Behance', value: 'behance'},
    {title: 'Bitbucket', value: 'bitbucket'},
    {title: 'Dribbble', value: 'dribbble'},
    {title: 'Etsy', value: 'etsy'},
    {title: 'Facebook', value: 'facebook'},
    {title: 'Flickr', value: 'flickr'},
    {title: 'GitHub', value: 'github'},
    {title: 'GitLab', value: 'gitlab'},
    {title: 'Goodreads', value: 'goodreads'},
    {title: 'Google Scholar', value: 'googlescholar'},
    {title: 'Instagram', value: 'instagram'},
    {title: 'LinkedIn', value: 'linkedin'},
    {title: 'Medium', value: 'medium'},
    {title: 'OrcID', value: 'orcid'},
    {title: 'Patreon', value: 'patreon'},
    {title: 'Pinterest', value: 'pinterest'},
    {title: 'Reddit', value: 'reddit'},
    {title: 'ResearchGate', value: 'researchgate'},
    {title: 'Sketchfab', value: 'sketchfab'},
    {title: 'Snapchat', value: 'snapchat'},
    {title: 'SoundCloud', value: 'soundcloud'},
    {title: 'Spotify', value: 'spotify'},
    {title: 'StackExchange', value: 'stackexchange'},
    {title: 'StackOverflow', value: 'stackoverflow'},
    {title: 'TikTok', value: 'tiktok'},
    {title: 'Tumblr', value: 'tumblr'},
    {title: 'Twitch', value: 'twitch'},
    {title: 'Twitter (X)', value: 'twitter'},
    {title: 'Vimeo', value: 'vimeo'},
    {title: 'WordPress', value: 'wordpress'},
    {title: 'YouTube', value: 'youtube'},
    {title: 'Zotero', value: 'zotero'},
    {title: 'Other', value: 'other'},  
]

export default defineType({
    name: 'socialLink',
    title: 'Social links',
    type: 'document',
    icon: IoShareSocialOutline,
    preview: {
      select: {
          knownType: 'socialLinkType',
          customType: 'customSocialLinkType',
          caption: 'caption',
          linkURL: 'linkURL',               
      },
      prepare({ knownType, customType, caption, linkURL }) {
        var icon:IconType = IoShareSocialOutline
        switch (knownType) {
          case '500px':
            icon = Si500Px
            break
          case 'academia':
            icon = SiAcademia
            break
          case 'artstation':
            icon = SiArtstation
            break
          case 'behance':
            icon = SiBehance
            break
          case 'bitbucket':
            icon = SiBitbucket
            break
          case 'dribble':
            icon = SiDribbble
            break
          case 'etsy':
            icon = SiEtsy
            break
          case 'facebook':
            icon = SiFacebook
            break
          case 'flickr':
            icon = SiFlickr
            break
          case 'github':
            icon = SiGithub
            break
          case 'gitlab':
            icon = SiGitlab
            break
          case 'goodreads':
            icon = SiGoodreads
            break
          case 'googlescholar':
            icon = SiGooglescholar
            break
          case 'instagram':
            icon = SiInstagram
            break
          case 'linkedin':
            icon = SiLinkedin
            break
          case 'medium':
            icon = SiMedium
            break
          case 'orcid':
            icon = SiOrcid
            break
          case 'patreon':
            icon = SiPatreon
            break
          case 'pinterest':
            icon = SiPinterest
            break
          case 'reddit':
            icon = SiReddit
            break
          case 'researchgate':
            icon = SiResearchgate
            break
          case 'sketchfab':
            icon = SiSketchfab
            break
          case 'snapchat':
            icon = SiSnapchat
            break
          case 'soundcloud':
            icon = SiSoundcloud
            break
          case 'spotify':
            icon = SiSpotify
            break
          case 'stackexchange':
            icon = SiStackexchange
            break
          case 'stackoverflow':
            icon = SiStackoverflow
            break
          case 'tiktok':
            icon = SiTiktok
            break
          case 'tumblr':
            icon = SiTumblr
            break
          case 'twitch':
            icon = SiTwitch
            break
          case 'twitter':
            icon = SiTwitter
            break
          case 'vimeo':
            icon = SiVimeo
            break
          case 'wordpress':
            icon = SiWordpress
            break
          case 'youtube':
            icon = SiYoutube
            break
          case 'zotero':
            icon = SiZotero
            break
          default:
        }
        return {
          title: typeof knownType !== 'undefined' ? (knownType === 'other' ? customType : knownType) : customType,
          subtitle: caption,
          media: icon
        }
      }
    },
    fields: [
      {
        name: 'socialLinkType',
        type: 'string',
        title: 'Social link type',
        description: 'Select the type of social network link or choose "Other" to add one that is not in the list.',
        validation: (Rule) => Rule.required().error('Social link type mandatory.'),
        options: {
            list: knownSocialLinks,
        },
      },
      {
        name: 'customSocialLinkType',
        type: 'string',
        title: 'Custom social link type',
        hidden: ({ document }) => (document?.socialLinkType !== 'other'),
        validation: (Rule) => Rule.custom((fieldValue, context) => {
          if (context.document?.socialLinkType === 'other' && typeof fieldValue === 'undefined') {
            return 'Custom social link type is mandatory if one of the known social link types is not selected.'
          }
          return true        
        }),
      },
      {
        name: 'caption',
        type: 'string',
        title: 'Social link caption',
        description: 'Optional caption of the social link.',
      },
      {
        name: 'linkURL',
        title: 'Link URL',
        type: 'url',
        description: 'Web URL to the social link profile.',
        validation: [
        (Rule) => Rule.uri({
            scheme: ['http', 'https'],
            allowRelative: false,
            allowCredentials: false,
          }),
        (Rule) => Rule.required().error('Link URL is mandatory.'),
        ],
      },
    ],
  })