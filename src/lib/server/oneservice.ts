// Basic Types
export interface ColorSample {
    isDarkMode: boolean;
    hexColor: string;
    isGreyScale?: boolean; // Optional based on usage
}

export interface SvgLogo {
    width: number;
    height: number;
    url: string;
}

export interface Provider {
    id: string;
    name: string;
    logoUrl: string;
    profileId: string;
    lightThemeSVGLogo?: SvgLogo; // Optional
    darkThemeSVGLogo?: SvgLogo; // Optional
}

export interface FocalRegion {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
}

export interface Image {
    width: number;
    height: number;
    quality: number;
    url: string;
    attribution?: string; // Optional
    title?: string; // Optional
    caption?: string; // Optional
    focalRegion?: FocalRegion; // Optional
    source: string;
    colorSamples?: ColorSample[]; // Optional
}

export interface SubReactionSummary {
    totalCount: number;
    type: "upvote" | "downvote" | "angry" | "like" | string; // Add other types if they exist
}

export interface ReactionSummary {
    totalCount: number;
    subReactionSummaries: SubReactionSummary[];
}

export interface SubCommentSummary {
    totalCount: number;
    type: "comment" | "reply" | string; // Add other types if they exist
}

export interface CommentSummary {
    totalCount: number;
    subCommentSummaries: SubCommentSummary[];
}

export interface RecoDocMetadata {
    ModelScore: string; // Could be number, but seems string in example
    IsAtfHighQualityContent: string; // Could be boolean, but seems string '1'
}

export interface Feed {
    id?: string; // Optional based on usage
    feedName: string;
    lastFreActionTimestamp: number;
    feedCompositionCategory?: string; // Optional
    canonicalName?: string; // Optional (seen in TopicFeed)
}

export interface Follow {
    id: string;
    name: string;
    time: string;
}

export interface Reason {
    type: string;
    rank: number;
    follow?: Follow; // Optional
}

export interface Slide {
    title: string;
    body: string;
    image: Image;
}

export interface ClosedCaption {
    locale: string;
    href: string;
}

export interface VideoMetadata {
    playTime: number;
    closedCaptions: ClosedCaption[];
}

export interface ExternalVideoFile {
    url: string;
    width: number;
    height: number;
    contentType?: string; // Optional
    fileSize?: number; // Optional
}

// --- Card Types ---

export interface BaseCard {
    type: string;
    isLocalContent: boolean;
    galleryItemCount: number;
    height?: number; // Optional, appears in some cards
    wpoId?: number; // Optional, appears in some cards
    wpoAdRank?: number; // Optional, appears in ad cards
}

export interface InfopaneCard extends BaseCard {
    type: "infopane";
    height: number;
    wpoId: number;
    subCards: Card[]; // Can contain nested cards
}

export interface NativeAdCard extends BaseCard {
    type: "nativead";
    wpoAdRank?: number;
}

export interface DisplayAdCard extends BaseCard {
    type: "displayad";
}

export interface ContentCard extends BaseCard {
    id: string;
    title: string;
    abstract: string;
    url: string;
    locale: string;
    publishedDateTime: string;
    isFeatured: boolean;
    images: Image[];
    colorSamples: ColorSample[];
    provider: Provider;
    category: string;
    reactionSummary: ReactionSummary;
    reactionStatus: string;
    commentSummary: CommentSummary;
    commentStatus: string;
    recoDocMetadata: RecoDocMetadata | null; // Can be null
    feed: Feed;
    isWorkNewsContent: boolean;
    reasons: Reason[];
    ri: string;
    recoId: string;
    newsClusterIdV5?: string; // Optional
    newsClusterIdV6?: string; // Optional
    source: string;
}

export interface SlideshowCard extends ContentCard {
    type: "slideshow";
    slides: Slide[];
}

export interface ArticleCard extends ContentCard {
    type: "article";
    readTimeMin: number;
}

export interface VideoCard extends ContentCard {
    type: "video";
    videoMetadata: VideoMetadata;
    externalVideoFiles: ExternalVideoFile[];
}

// --- Special Data Card Types ---

// MoneyInfo Card Data (needs JSON.parse on 'data' string)
export interface LocalizedAttribute {
    displayName: string;
    shortName?: string; // Optional
}

export interface QuoteItem {
    currency: string;
    id: string;
    symbol: string;
    price: string;
    priceNumber: number;
    priceDayLow: number;
    priceDayHigh: number;
    marketCap: number;
    priceChange1Month: number;
    price52wHigh: number;
    price52wLow: number;
    pricePreviousClose: number;
    changeValue: string;
    changePcnt: string;
    changePcntNumber: number;
    changeValueNumber: number;
    displayName: string;
    shortName?: string; // Optional
    gain: boolean;
    unchanged: boolean;
    securityType: string;
    timeLastUpdated: string;
    timeLastTraded: string;
    exchangeName: string;
    exchangeId: string;
    iconUrl?: string; // Optional
    return1Year: number;
    return3Year: number;
    returnYTD: number;
    return1Month: number;
    return1Day: number;
    localizedAttributes: Record<string, LocalizedAttribute>;
}

export interface TabDetail {
    quoteIds: string[];
    quoteItems?: QuoteItem[]; // Optional, present in 'recommend'
}

export interface TabListDetails {
    watchlist: TabDetail;
    recommend?: TabDetail; // Optional
    market: TabDetail;
    crypto: TabDetail;
    currencies: TabDetail;
    movers?: TabDetail; // Optional
    gainers?: TabDetail; // Optional
    losers?: TabDetail; // Optional
}

export interface TraceInfo {
    userId: string;
    traceId: string;
    isSignedIn: boolean;
    signInType: string;
}

export interface MoneyData {
    userSignedIn: boolean;
    dataFrom: string;
    tabs: string[];
    fullWatchlistQuoteIds: any[]; // Type based on actual content if known
    dataTimestamp: number;
    tabListDetails: TabListDetails;
    isUserInterestedInNews: boolean;
    taskbarEventNotification: boolean;
    nonWatchlistNotification: boolean;
    userGroup: string;
    userCohort: number;
    disableSpotlight: boolean;
    traceInfo: TraceInfo;
    explorationSettings: Record<string, any>; // Use a more specific type if known
}

export interface MoneyInfoCard extends BaseCard {
    type: "MoneyInfo";
    height: number;
    wpoId: number;
    subCards: any[]; // Type based on actual content if known
    position: number;
    data: string; // This string contains JSON for MoneyData
    dataType: "MoneyInfo";
    dataVersion: number;
}

// WeatherSummary Card Data (needs JSON.parse on 'data' string)
export interface Coordinates {
    lat: number;
    lon: number;
}

export interface WeatherLocation {
    TimezoneName: string;
    // Add other potential fields if they exist
}

export interface WeatherSource {
    id: string;
    coordinates: Coordinates;
    location: WeatherLocation;
}

export interface CurrentWeather {
    baro: number;
    cap: string;
    capAbbr: string;
    daytime: string;
    dewPt: number;
    feels: number;
    rh: number;
    icon: number;
    symbol: string;
    pvdrIcon: string;
    wx: string;
    sky: string;
    temp: number;
    tempDesc: number;
    utci: number;
    uv: number;
    uvDesc: string;
    vis: number;
    windDir: number;
    windSpd: number;
    windTh: number;
    windGust: number;
    created: string;
    pvdrCap: string;
    aqi: number;
    aqiSeverity: string;
    aqLevel: number;
    primaryPollutant: string;
    aqiValidTime: string;
    cloudCover: number;
}

export interface DayNightForecast {
    cap: string;
    symbol: string;
    windSpd: number;
    summaries?: string[]; // Optional
}

export interface DailyDetails {
    day: DayNightForecast;
    night: DayNightForecast;
    pvdrCap: string;
    valid: string;
    icon: number;
    symbol: string;
    pvdrIcon: string;
    precip: number;
    rhHi: number;
    rhLo: number;
    tempHi: number;
    tempLo: number;
    uv: number;
    uvDesc: string;
    created: string;
    rainAmount: number;
    snowAmount: number;
    raToMN: number;
    saToMN: number;
    vis: number;
    aqi: number;
}

export interface Almanac {
    valid: string;
    sunrise: string;
    sunset: string;
}

export interface DailyForecast {
    daily: DailyDetails;
    almanac: Almanac;
}

export interface Forecast {
    days: DailyForecast[];
}

export interface MapUris {
    uris: Record<string, string>;
}

export interface MapsMetadata {
    NowcastVectorMap: MapUris;
    PRateMap: MapUris;
    TileImageMetadata: MapUris;
    AirQualityHeatMap: MapUris;
    AqiHeatMap: MapUris;
    SevereWeatherSvg: MapUris;
    PollenCity: MapUris;
    PollenImage: MapUris;
    HurricaneSvg: MapUris;
    WildFireSvg: MapUris;
    SevereWeatherText: MapUris;
    TemperatureGrid: MapUris;
    TemperatureGridRR: MapUris;
    TemperatureGridCC: MapUris;
    AirQualityHeatMapEu: MapUris;
    EuPollenCity: MapUris;
    EuPollenImage: MapUris;
    ForecastVideo: MapUris;
    ThunderstormPolygonSvg: MapUris;
    LightningStrikeSvg: MapUris;
    SatellitePreRender: MapUris;
    HurricaneSvgStatic: MapUris;
    HurricaneCnSvgStatic: MapUris;
    CloudForecastOmgHd: MapUris;
    TemperatureOmgHdRR: MapUris;
    TemperatureOmgHdCC: MapUris;
    PrecipitationOmgHd: MapUris;
    DewPointOmgHd: MapUris;
    RelativeHumidityOmgHd: MapUris;
    WindSpeedOmgHd: MapUris;
}

export interface ContentData {
    id: string;
    cid: number;
    ranking: number;
    contenttype: string;
    isSpotlight: boolean;
    content: any[]; // Type based on actual content if known
}

export interface Weather {
    alerts: any[]; // Type based on actual content if known
    current: CurrentWeather;
    forecast: Forecast;
    mapsmetadata: MapsMetadata;
    contentdata: ContentData[];
}

export interface WeatherProvider {
    name: string;
    url?: string; // Optional
}

export interface IconMap {
    iconBase: string;
    symbolMap: Record<string, string>;
}

export interface WeatherResponse {
    weather: Weather[];
    source: WeatherSource;
    provider: WeatherProvider;
    aqiProvider: WeatherProvider;
    iconMap: IconMap;
}

export interface UserLocation {
    Country: string;
    CountryCode: string;
    State: string;
    City: string;
    UtcOffset: string;
    IsLocalized: boolean;
    Accuracy: number;
    PopIpDialog: boolean;
    Latitude: number;
    Longitude: number;
    PostalCode?: string | null; // Optional/Nullable
    DmaCode?: string | null; // Optional/Nullable
    DetectionMetadata?: Record<string, string>; // Optional
    LocationSource?: string; // Optional
}

export interface UserProfile {
    locationSettingMode: string;
    location: UserLocation;
    followedLocations: any[]; // Type based on actual content if known
    detectedLocation: UserLocation;
    sig: Record<string, any>; // Use a more specific type if known
    eplant: Record<string, any>; // Use a more specific type if known
}

export interface BackgroundInfo {
    info: string[];
}

export interface CurrentIcon {
    icon: string;
}

export interface WeatherCard {
    baseUrl: string;
    iconBase: string;
    bg: BackgroundInfo;
    loc: string[];
    cur: CurrentIcon;
}

export interface Units {
    pressure: string;
    temperature: string;
    speed: string;
    height: string;
    distance: string;
}

export interface WeatherData {
    responses: WeatherResponse[];
    userProfile: UserProfile;
    cards: WeatherCard[];
    isSpotlight: boolean;
    units: Units;
}

export interface WeatherSummaryCard extends BaseCard {
    type: "WeatherSummary";
    height: number;
    wpoId: number;
    subCards: any[]; // Type based on actual content if known
    position: number;
    data: string; // This string contains JSON for WeatherData
    dataType: "WeatherOverview";
    dataVersion: number;
}

// TrafficDelays Card Data (needs JSON.parse on 'data' string)
export interface TrafficLocationDetectionMetadata {
    IPCategory?: string;
    IPCategoryConfidence?: string;
    IsServedFromBlisApiLocationCache?: string;
    IsServedFromRevGeoCache?: string;
}

export interface TrafficLocation {
    Country: string | null;
    CountryCode: string | null;
    State: string | null;
    PostalCode: string | null;
    UtcOffset: number | null;
    DmaCode: string | null;
    IsLocalized: boolean;
    Accuracy: number;
    IsAutoDetected: boolean;
    City: string;
    DetectionMetadata: TrafficLocationDetectionMetadata | null;
    LocationSource: string | null;
    Latitude: number;
    Longitude: number;
}

export interface AreaTrafficDelayInfo {
    AreaTrafficCongestion: number;
    DelayColor: number;
    AreaDelaySupported: boolean;
}

export interface TrafficEndpointLocation {
    Country: string | null;
    CountryCode: string | null;
    State: string | null;
    PostalCode: string | null;
    UtcOffset: number | null;
    DmaCode: string | null;
    IsLocalized: boolean;
    Accuracy: number;
    IsAutoDetected: boolean;
    City: string;
    DetectionMetadata: any | null; // Type based on actual content if known
    LocationSource: any | null; // Type based on actual content if known
    Latitude: number;
    Longitude: number;
}

export interface TrafficEndpoint {
    Location: TrafficEndpointLocation;
    Address: string;
    AddressLine1: string | null;
    AddressType: number;
    AddressSource: number;
    TimezoneId: string;
    UpdateTime: string;
}

export interface TrafficTimeInfo {
    TravelDuration: number;
    TravelDistance: number;
    TrafficDelta: number;
    TrafficCongestion: number;
    Id: string;
    Guid: string;
    Start: TrafficEndpoint;
    End: TrafficEndpoint;
    BoundingBox: any | null; // Type based on actual content if known
    ViaRoads: string;
    RouteType: number;
    RouteOptions: any | null; // Type based on actual content if known
    RoutePath: string;
    Incidents: any | null; // Type based on actual content if known
    SegmentCongestion: any | null; // Type based on actual content if known
    TravelDurationHistoric: number;
    FromId: string;
    ToId: string;
}

export interface TrafficDelayInfo {
    Delay: number;
    Locality: string;
    BoundingBoxMin: Coordinates;
    BoundingBoxMax: Coordinates;
    TrafficCongestion: number;
    Incident: string;
    DelayColor: number;
}

export interface TrafficNewsLogo {
    url: string;
}

export interface TrafficNewsProvider {
    name: string;
    logo: TrafficNewsLogo;
}

export interface TrafficNewsImage {
    width: number;
    height: number;
    url: string;
    title: string;
}

export interface TrafficNewsItem {
    SourceId: string;
    Title: string;
    PublishedDateTime: string;
    Provider: TrafficNewsProvider;
    Images: TrafficNewsImage[];
    Url: string;
}

export interface TrafficData {
    ImpressionFlights: any[]; // Type based on actual content if known
    Location: TrafficLocation;
    CenterLocation: TrafficLocation;
    DetectedLocation: TrafficLocation;
    Attribution: string;
    Heading: string;
    Version: any | null; // Type based on actual content if known
    TrafficIncidents: any[]; // Type based on actual content if known
    AreaTrafficDelay: AreaTrafficDelayInfo;
    TrafficTime: TrafficTimeInfo[];
    TrafficDelays: TrafficDelayInfo[];
    TrafficCameras: any[]; // Type based on actual content if known
    TrafficStatusList: any[]; // Type based on actual content if known
    TrafficNews: TrafficNewsItem[];
    GasStations: any[]; // Type based on actual content if known
    TrafficInsights: any | null; // Type based on actual content if known
    LocalNearbyResponse: any | null; // Type based on actual content if known
    TransitNearbyLines: any | null; // Type based on actual content if known
    LocationMode: string;
    SupportedArea: boolean;
    SuggestedZoomLevel: number;
    Home: any | null; // Type based on actual content if known
    Work: any | null; // Type based on actual content if known
    Routes: any | null; // Type based on actual content if known
    CustomRoutes: any | null; // Type based on actual content if known
    CommuteDestinations: any | null; // Type based on actual content if known
    UserDoesntHaveWork: boolean;
    DistanceUnit: string;
    AvailableInfoTypes: number[];
    InfoTypesForFallback: number[];
    MultiScenarioCarouselInfoTypes: any | null; // Type based on actual content if known
    WeatherTrafficComboInfoType: number;
    CommuteOutcome: number;
    PreviewInfo: any[]; // Type based on actual content if known
    BadgeInfo: any[]; // Type based on actual content if known
    IsSpotlight: string; // '0'
    UpsellEnabledForWpo: boolean;
    EnableInlineCommuteUpsell: boolean;
    EnableInlineCommuteUpsellWithRewards: boolean;
    EnableMobileCommuteUpsellWithRewards: boolean;
    IsMobileUpsellWithRewardsHidden: boolean;
    EnableMobileCommuteUpsell: boolean;
    IsMobileUpsellHidden: boolean;
    IsComboCardEligible: boolean;
    TrafficInfoType: number;
}

export interface TrafficDelaysCard extends BaseCard {
    type: "TrafficDelays";
    height: number;
    wpoId: number;
    subCards: any[]; // Type based on actual content if known
    position: number;
    data: string; // This string contains JSON for TrafficData
}

// SportsMatch Card Data (needs JSON.parse on 'data' string)
export interface GameState {
    state: string;
    gameClock: string;
    gamePeriod: string;
}

export interface Participant {
    yId: string;
    satoriId: string;
    name: string;
    shortName: string;
    primaryColorHex: string;
    teamTriggeringId: string;
    homeAwayStatus: string;
    imageId: string;
    score: string;
    isWinner?: string; // Optional ('True')
    gameCenterUrl: string;
}

export interface SportsMatchInfo {
    gameId: string;
    gameStartDateTime: string;
    gameCenterUrl: string;
    rank: string; // Could be number
    gameState: GameState;
    participantOne: Participant;
    participantTwo: Participant;
}

export interface SportsLeague {
    id: string;
    imageId: string;
    leagueSeasonPhase: string;
    leagueStartDateTime: string;
    name: string;
    satoriId: string;
    clickThroughUrl: string;
    sportsMatches?: SportsMatchInfo[]; // Optional
}

export interface SportsTabContent {
    sport: string;
    contentHash: string;
    league: SportsLeague;
    // Add other potential fields if they exist (e.g., for TournamentsList)
}

export interface SportsTab {
    tabType: string;
    primaryColorHex: string;
    primaryEntityId: string;
    hash: string;
    primaryEntityImage: string;
    primaryEntityName: string;
    primaryEntityType: string;
    yId: string;
    tabContentReason: string;
    tabContentType: string;
    clickThroughUrl?: string; // Optional
    reason?: string; // Optional
    tabContent?: SportsTabContent; // Optional (loaded via tabContentUrl)
    tabContentUrl?: string; // Optional
    isLive?: string; // Optional ('True')
}

export interface AdditionalTab {
    previewType: string;
}

export interface SportsModel {
    CardType: string;
    DataType: string;
    Version: string;
    Hash: string;
    SportsUserGroup: string;
    DefaultTabFocus: string; // Could be number
    SpRecoLogs: string;
    LogMessage: string;
    Tabs: SportsTab[];
    additionalTabs: AdditionalTab[];
    ExplorationSettings: Record<string, any>; // Use a more specific type if known
}

export interface SportsData {
    ResponseCreationTime: string;
    Model: SportsModel;
}

export interface SportsMatchCard extends BaseCard {
    type: "SportsMatch";
    height: number;
    wpoId: number;
    subCards: any[]; // Type based on actual content if known
    position: number;
    data: string; // This string contains JSON for SportsData
}

// WebContent Card (often nested in TopicFeed)
export interface Stock {
    stockId: string;
    score: number;
}

export interface SentimentRating {
    topic: string;
    score: number;
}

export interface FinanceMetadata {
    stocks: Stock[];
    sentimentRatings: SentimentRating[];
    categories: any[]; // Type based on actual content if known
}

export interface WebContentVideoMetadata {
    playTime: number;
    viewCount: number;
    motionThumbnailUrl: string;
    channelPageUrl: string;
    channelTitle: string;
    domain: string;
    mediaUniqueId: string;
    allowEmbed: boolean;
    allowHttpsEmbed: boolean;
    allowMobileEmbed: boolean;
}

export interface WebContentCard extends ContentCard {
    type: "webcontent";
    financeMetadata?: FinanceMetadata; // Optional
    topics?: any[]; // Optional, type based on actual content if known
    subscriptionProductType?: string; // Optional
    videoMetadata?: WebContentVideoMetadata; // Optional, different structure
    externalVideoFiles?: ExternalVideoFile[]; // Optional
}

// TopicFeed Card
export interface TopicFeedCard extends BaseCard {
    type: "TopicFeed";
    id: string; // e.g., "CanonicalName-watch-video"
    subCards: Card[]; // Can contain WebContentCard, VideoCard, etc.
    feed: Feed;
    isTriggeredByClient: boolean;
    IsHeroQspXfeed: boolean;
}

// Placeholder Card (used in river layout)
export interface PlaceholderCard extends BaseCard {
    type: "placeholder";
    placeholderId: number;
}

// Union type for all possible cards
type Card =
    | InfopaneCard
    | NativeAdCard
    | SlideshowCard
    | ArticleCard
    | VideoCard
    | MoneyInfoCard
    | WeatherSummaryCard
    | TrafficDelaysCard
    | SportsMatchCard
    | TopicFeedCard
    | WebContentCard // Added as it appears nested
    | DisplayAdCard
    | PlaceholderCard; // Added for river layout

// --- Section Types ---

export interface WpoMetadata {
    infopaneFirstSlideTransitionSpeedInSeconds: number;
    infopaneRemainingSlidesTransitionSpeedInSeconds: number;
    cardPlacementRule: string;
}

export interface CardDataSection {
    region: "cardData";
    cards: Card[];
    wpoMetadata: WpoMetadata;
}

export interface RiverCardInfo {
    type?: string; // Optional, seen on ads/display
    isLocalContent: boolean;
    galleryItemCount: number;
    wpoRank: number;
    wpoId: number;
    wpoAdRank?: number; // Optional
    colSpan?: number; // Optional
    feed?: Feed; // Optional (seen on TopicFeed)
    wpoMetadata?: { cardPlacementRule: string }; // Optional
    placeholderId?: number; // Optional (for placeholders)
    id?: string; // Optional (seen on TopicFeed)
}

export interface RiverSubSection {
    cards: RiverCardInfo[];
    column: number;
    requestedColumnCount: number;
}

export interface RiverSection {
    region: "river";
    subSections: RiverSubSection[][]; // Array of columns, each containing subsections
    requestedColumnCount: number;
}

export interface BackupCardSection {
    dataTemplate: string;
    layoutTemplate: string;
    cards: Card[]; // Contains full card objects
}

export interface BackupSection {
    region: "backup";
    subSections: BackupCardSection[];
}

// Union type for all possible sections
type Section = CardDataSection | RiverSection | BackupSection;

// --- Service Context & Auth Context ---

export interface ServiceContext {
    fdHead: string;
    fdFlightingVersion: string;
    serviceActivityId: string;
    tmpl: string;
    debugInfo: string;
    responseCreationDateTime: string;
    requestHeaderMuid: string;
    debugId: string;
    searchStoreVersion: string;
    tier: string;
    clientActivityId: string;
    requestFor: string;
}

export interface AuthContext {
    muid: string;
    at: string;
    it: string;
}

// --- Top Level API Response ---

export interface ApiResponse {
    nextPageUrl: string;
    sections: Section[];
    serviceContext: ServiceContext;
    lockScreenPreviews: any[]; // Type based on actual content if known
    pulseData: any[]; // Type based on actual content if known
    specialEvents: Record<string, any>; // Use a more specific type if known
    isPartial: boolean;
    expirationDateTime: string;
    authContext: AuthContext;
}

const url = (market: string) => `https://assets.msn.com/service/news/feed/pages/weblayout?adoffsets=c1:-1,c2:-1,c3:-1&apikey=0QfOX3Vn51YCzitbLaRkTTBadtWpgTN8NZLW0C1SEM&audienceMode=adult&cm=${market}&colstatus=c1:0,c2:0,c3:0&column=c3&colwidth=300&contentType=article,video,slideshow,webcontent&dprValue=2&duotone=true&it=web&l3v=2&layout=c3&memory=8&newsSkip=0&newsTop=48&ocid=hponeservicefeed&pgc=11&private=1&scn=ANON&timeOut=1000&vpSize=983x1105&wposchema=byregion`

export async function getOneService(market: string): Promise<Card[]> {
    const response = await fetch(url(market))
    await throwIfNotOk(response)
    const data = await response.json() as ApiResponse;

    return data.sections.filter(s => s.region == "cardData").flatMap(s => s.cards)
}

async function throwIfNotOk(res: Response) {
    if (!res.ok) {
        try {
            const text = await res.text()
            throw new Error(`${res.status}: ${res.statusText}\n${text}`)
        } catch (ex) {
            throw new Error(`${res.status}: ${res.statusText}`)
        }
    }
}