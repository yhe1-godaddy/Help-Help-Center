import * as Factory from 'factory.ts';
import {
  Website,
  WebsiteData,
  WebsiteEntitlements,
  WebsiteEntitlementsTransitionable,
  WebsiteOptions,
  WebsiteProperties
} from '../../src/types';

// eslint-disable-next-line id-length
export const websiteEntitlementsTransitionableFactory = Factory.makeFactory<WebsiteEntitlementsTransitionable>(
  {
    businessPlusServices1: true,
    commerceServices1: true
  }
);

export const websiteEntitlementsFactory = Factory.makeFactory<WebsiteEntitlements>({
  current: {
    'gem': '',
    'ssl': true,
    'getFound': true,
    'onlineBookkeeping': true,
    'businessSections': true,
    'socialMediaManager': true,
    'cdn': true,
    'commerce': true,
    'payments': true,
    'ads': true,
    'reservations': true,
    'ordering': true,
    'seo': true,
    'mls': true,
    'adCredits': true,
    'appointments': true,
    'appointments.c1SmsNotifications': true,
    'appointments.c2EmailReminders': true,
    'appointments.c2Rescheduling': true,
    'appointments.c2SmsNotifications': true,
    'appointments.c2SmsReminders': true,
    'appointments.calendarSync': true,
    'appointments.facebookBooking': true,
    'appointments.onlinePayments': true,
    'appointments.recurringEvents': true,
    'appointments.singleEvents': true,
    'audio': true,
    'blog': true,
    'coaching': true,
    'commerce.checkout': true,
    'commerce.instantProvision': true,
    'commerce.marketplace': true,
    'commerce.productLimit': '',
    'commerce.sms': true,
    'contacts': true,
    'conversations': true,
    'difyPhotoshoot': true,
    'dify.contentRequests': true,
    'dify.websiteBuild': true,
    'dify.websiteCare': true,
    'fileUpload': true,
    'gallery': true,
    'giftcard': true,
    'gofundme': true,
    'imprint': true,
    'insight': true,
    'insight.goals': true,
    'insight.metrics': true,
    'insight.nextSteps': true,
    'insight.suggestions': true,
    'mcc.ordersPerMonth': true,
    'multiPage': true,
    'over': '',
    'paymentMethods.paypalForPartners.additionalRate': '',
    'policy': true,
    'presenceIQ': true,
    'promoType': true,
    'pwa': true,
    'reviews': true,
    'rss': true,
    'seo.dify': true,
    'seo.siteAudit': true,
    'seo.siteAudit.dify': true,
    'singlePageHackathon': true,
    'socialAds': true,
    'socialAds.dify': true,
    'socialMediaManager.difySocial': true,
    'socialMediaManager.fb': true,
    'socialMediaManager.fb.connect': true,
    'socialMediaManager.fb.connect.dify': true,
    'socialMediaManager.fb.connect.msh': true,
    'socialMediaManager.gmb': true,
    'socialMediaManager.gmb.connect': true,
    'socialMediaManager.gmb.connect.dify': true,
    'socialMediaManager.gmb.create': true,
    'socialMediaManager.gmb.create.dify': true,
    'socialMediaManager.gmb.description': true,
    'socialMediaManager.gmb.dqVerification': true,
    'socialMediaManager.gmb.hours': true,
    'socialMediaManager.gmb.insights': true,
    'socialMediaManager.gmb.photos': true,
    'socialMediaManager.gmb.post': true,
    'socialMediaManager.gmb.reviews': true,
    'socialMediaManager.instagram': true,
    'socialMediaManager.twitter': true,
    'socialMediaManager.twitter.connect.dify': true,
    'socialMediaManager.twitter.connect.msh': true,
    'socialMediaManager.yelp': true,
    'socialMediaManager.yelp.connect': true,
    'socialMediaManager.yelp.connect.dify': true,
    'socialMediaManager.yelp.create': true,
    'socialMediaManager.yelp.create.dify': true,
    'terms': true,
    'transitions': true,
    'video': true,
    'website': '',
    'zillow': true
  },
  transitionable: {
    'dify.contentRequests': websiteEntitlementsTransitionableFactory.build(),
    'dify.websiteCare': websiteEntitlementsTransitionableFactory.build(),
    'seo.dify': websiteEntitlementsTransitionableFactory.build(),
    'seo.siteAudit.dify': websiteEntitlementsTransitionableFactory.build(),
    'socialAds.dify': websiteEntitlementsTransitionableFactory.build(),
    'socialMediaManager.fb.connect.dify': websiteEntitlementsTransitionableFactory.build(),
    'socialMediaManager.twitter.connect.dify': websiteEntitlementsTransitionableFactory.build()
  }
});

export const WebsiteDataFactory = Factory.makeFactory<WebsiteData>({
  customerIntentions: {
    getNoticed: true,
    localCustomers: true,
    onlineStore: true,
    onlineAppointments: true
  },
  defaultImageUrls: [],
  navigation: [],
  persistentEntitlements: {
    appointments: true,
    commerce: true
  },
  productEntitlements: {
    gem: '',
    ssl: true,
    getFound: true,
    onlineBookkeeping: true,
    businessSections: true,
    socialMediaManager: true,
    cdn: true,
    commerce: true,
    payments: true,
    ads: true,
    reservations: true,
    ordering: true,
    seo: true,
    mls: true
  },
  stockImages: [
    {
      url: '',
      lastModified: ''
    }
  ],
  stockPhotos: [],
  verticalGroups: []
});

export const websitePropertiesFactory = Factory.makeFactory<WebsiteProperties>({
  accountCreationIsc: '',
  accountCreationItc: '',
  accountCreationListingId: '',
  accountCreationTrialLength: '',
  blogStatus: '',
  businessCategory: '',
  businessName: '',
  colorPack: '',
  colorPackCategory: '',
  contactsStatus: '',
  dpsSubdomain: '',
  editorFirstVisitMarketCookie: '',
  editorFirstVisitUtcDateTime: '',
  editorLastMarketCookie: '',
  editorLastVisitUtcDateTime: '',
  email: '',
  fontPack: '',
  olaStatus: '',
  olsAccountStatus: '',
  olsStatus: '',
  onboardedColorPack: '',
  onboardedFontPack: '',
  onboardedTemplateType: '',
  onboardedTheme: '',
  onboardedVertical: '',
  onboardingCompletedUtcDateTime: '',
  pathway: '',
  publishStatus: '',
  themePreset: '',
  ventureId: '',
  virtualOrderId: ''
});

export const websiteOptionsFactory = Factory.makeFactory<WebsiteOptions>({
  anyoneHasAccess: false,
  areSubscribersContacts: false,
  cookieBannerDeclineEnabled: false,
  cookieBannerEnabled: false,
  createdAsNru: false,
  membershipAccountsOn: false,
  startedAsFreemium: false,
  startedAsTrial: false,
  usedFontBlacklist: false,
  usedHeaderImages: false
});

export const websiteFactory = Factory.makeFactory<Website>({
  id: Factory.each(i => i + ''),
  accountId: '',
  accountSource: '',
  createDate: '',
  customerId: Factory.each(i => 'customer_' + i),
  data: WebsiteDataFactory.build(),
  domainName: '',
  homepageId: '',
  options: websiteOptionsFactory.build(),
  planType: '',
  properties: websitePropertiesFactory.build(),
  resellerId: 0,
  shopperId: '',
  status: '',
  subscriptionId: '',
  type: '',
  updateDate: '',
  ventureId: Factory.each(i => 'venture_' + i),
  entitlements: websiteEntitlementsFactory.build()
});
