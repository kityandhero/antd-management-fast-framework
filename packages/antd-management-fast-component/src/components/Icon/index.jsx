import React from 'react';
import {
  ApartmentOutlined,
  ArrowDownOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  ArrowUpOutlined,
  BellFilled,
  BellOutlined,
  BorderOuterOutlined,
  BugFilled,
  BugOutlined,
  CaretDownFilled,
  CaretDownOutlined,
  CaretUpFilled,
  CaretUpOutlined,
  CheckCircleFilled,
  CheckCircleOutlined,
  ClearOutlined,
  ClockCircleFilled,
  ClockCircleOutlined,
  CloseCircleFilled,
  CloseCircleOutlined,
  CloudDownloadOutlined,
  ColumnHeightOutlined,
  CommentOutlined,
  CompressOutlined,
  ContactsFilled,
  ContactsOutlined,
  CopyFilled,
  CopyOutlined,
  CustomerServiceOutlined,
  DashboardFilled,
  DashboardOutlined,
  DeleteFilled,
  DeleteOutlined,
  DesktopOutlined,
  DingdingOutlined,
  DisconnectOutlined,
  DownCircleFilled,
  DownCircleOutlined,
  DownloadOutlined,
  DownOutlined,
  EditFilled,
  EditOutlined,
  EllipsisOutlined,
  ExclamationCircleFilled,
  ExclamationCircleOutlined,
  ExportOutlined,
  EyeFilled,
  EyeOutlined,
  FileFilled,
  FileOutlined,
  FilterFilled,
  FilterOutlined,
  FolderFilled,
  FolderOutlined,
  ForkOutlined,
  FormOutlined,
  GiftFilled,
  GiftOutlined,
  HistoryOutlined,
  HomeFilled,
  HomeOutlined,
  IdcardFilled,
  IdcardOutlined,
  ImportOutlined,
  InboxOutlined,
  InfoCircleFilled,
  InfoCircleOutlined,
  InsertRowAboveOutlined,
  InsertRowBelowOutlined,
  InsertRowLeftOutlined,
  InsertRowRightOutlined,
  InstagramFilled,
  InstagramOutlined,
  KeyOutlined,
  LayoutFilled,
  LayoutOutlined,
  LeftCircleFilled,
  LeftCircleOutlined,
  LeftOutlined,
  LineOutlined,
  LinkOutlined,
  LoadingOutlined,
  LockFilled,
  LockOutlined,
  LoginOutlined,
  LogoutOutlined,
  MacCommandFilled,
  MacCommandOutlined,
  MailFilled,
  MailOutlined,
  MessageFilled,
  MessageOutlined,
  MinusCircleFilled,
  MinusCircleOutlined,
  MobileFilled,
  MobileOutlined,
  PauseCircleFilled,
  PauseCircleOutlined,
  PhoneFilled,
  PhoneOutlined,
  PictureFilled,
  PictureOutlined,
  PlayCircleFilled,
  PlayCircleOutlined,
  PlusCircleFilled,
  PlusCircleOutlined,
  PlusOutlined,
  PlusSquareFilled,
  PlusSquareOutlined,
  PoweroffOutlined,
  ProfileFilled,
  ProfileOutlined,
  ProjectFilled,
  ProjectOutlined,
  QrcodeOutlined,
  QuestionCircleFilled,
  QuestionCircleOutlined,
  ReadFilled,
  ReadOutlined,
  ReconciliationFilled,
  ReconciliationOutlined,
  RedoOutlined,
  ReloadOutlined,
  RetweetOutlined,
  RightCircleFilled,
  RightCircleOutlined,
  RightOutlined,
  RollbackOutlined,
  SaveFilled,
  SaveOutlined,
  ScanOutlined,
  ScheduleFilled,
  ScheduleOutlined,
  SearchOutlined,
  SelectOutlined,
  SettingFilled,
  SettingOutlined,
  ShopFilled,
  ShopOutlined,
  ShoppingCartOutlined,
  ShoppingFilled,
  ShoppingOutlined,
  SnippetsFilled,
  SnippetsOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  SoundFilled,
  SoundOutlined,
  SwapOutlined,
  SyncOutlined,
  TagFilled,
  TagOutlined,
  TagsFilled,
  TagsOutlined,
  TeamOutlined,
  ToolFilled,
  ToolOutlined,
  UndoOutlined,
  UnlockFilled,
  UnlockOutlined,
  UnorderedListOutlined,
  UpCircleFilled,
  UpCircleOutlined,
  UploadOutlined,
  UpOutlined,
  UserOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignMiddleOutlined,
  VerticalAlignTopOutlined,
  VideoCameraAddOutlined,
  VideoCameraFilled,
  VideoCameraOutlined,
  WarningFilled,
  WarningOutlined,
} from '@ant-design/icons';

export const iconBuilder = {
  help: (properties = null, filled = false) => {
    if (filled) {
      return <InfoCircleFilled {...(properties || {})} />;
    }

    return <InfoCircleOutlined {...(properties || {})} />;
  },
  add: (properties = null) => {
    return <PlusOutlined {...(properties || {})} />;
  },
  plus: (properties = null) => {
    return <PlusOutlined {...(properties || {})} />;
  },
  addCircle: (properties = null, filled = false) => {
    if (filled) {
      return <PlusCircleFilled {...(properties || {})} />;
    }

    return <PlusCircleOutlined {...(properties || {})} />;
  },
  plusCircle: (properties = null, filled = false) => {
    if (filled) {
      return <PlusCircleFilled {...(properties || {})} />;
    }

    return <PlusCircleOutlined {...(properties || {})} />;
  },
  customerService: (properties = null) => {
    return <CustomerServiceOutlined {...(properties || {})} />;
  },
  comment: (properties = null) => {
    return <CommentOutlined {...(properties || {})} />;
  },
  reload: (properties = null) => {
    return <ReloadOutlined {...(properties || {})} />;
  },
  edit: (properties = null, filled = false) => {
    if (filled) {
      return <EditFilled {...(properties || {})} />;
    }

    return <EditOutlined {...(properties || {})} />;
  },
  enable: (properties = null, filled = false) => {
    if (filled) {
      return <PlayCircleFilled {...(properties || {})} />;
    }

    return <PlayCircleOutlined {...(properties || {})} />;
  },
  disable: (properties = null, filled = false) => {
    if (filled) {
      return <PauseCircleFilled {...(properties || {})} />;
    }

    return <PauseCircleOutlined {...(properties || {})} />;
  },
  playCircle: (properties = null, filled = false) => {
    if (filled) {
      return <PlayCircleFilled {...(properties || {})} />;
    }

    return <PlayCircleOutlined {...(properties || {})} />;
  },
  pauseCircle: (properties = null, filled = false) => {
    if (filled) {
      return <PauseCircleFilled {...(properties || {})} />;
    }

    return <PauseCircleOutlined {...(properties || {})} />;
  },
  delete: (properties = null, filled = false) => {
    if (filled) {
      return <DeleteFilled {...(properties || {})} />;
    }

    return <DeleteOutlined {...(properties || {})} />;
  },
  clock: (properties = null, filled = false) => {
    if (filled) {
      return <ClockCircleFilled {...(properties || {})} />;
    }

    return <ClockCircleOutlined {...(properties || {})} />;
  },
  close: (properties = null, filled = false) => {
    if (filled) {
      return <CloseCircleFilled {...(properties || {})} />;
    }

    return <CloseCircleOutlined {...(properties || {})} />;
  },
  closeCircle: (properties = null, filled = false) => {
    if (filled) {
      return <CloseCircleFilled {...(properties || {})} />;
    }

    return <CloseCircleOutlined {...(properties || {})} />;
  },
  copy: (properties = null, filled = false) => {
    if (filled) {
      return <CopyFilled {...(properties || {})} />;
    }

    return <CopyOutlined {...(properties || {})} />;
  },
  eye: (properties = null, filled = false) => {
    if (filled) {
      return <EyeFilled {...(properties || {})} />;
    }

    return <EyeOutlined {...(properties || {})} />;
  },
  export: (properties = null) => {
    return <ExportOutlined {...(properties || {})} />;
  },
  home: (properties = null, filled = false) => {
    if (filled) {
      return <HomeFilled {...(properties || {})} />;
    }

    return <HomeOutlined {...(properties || {})} />;
  },
  import: (properties = null) => {
    return <ImportOutlined {...(properties || {})} />;
  },
  idCard: (properties = null, filled = false) => {
    if (filled) {
      return <IdcardFilled {...(properties || {})} />;
    }

    return <IdcardOutlined {...(properties || {})} />;
  },
  search: (properties = null) => {
    return <SearchOutlined {...(properties || {})} />;
  },
  setting: (properties = null, filled = false) => {
    if (filled) {
      return <SettingFilled {...(properties || {})} />;
    }

    return <SettingOutlined {...(properties || {})} />;
  },
  tag: (properties = null, filled = false) => {
    if (filled) {
      return <TagFilled {...(properties || {})} />;
    }

    return <TagOutlined {...(properties || {})} />;
  },
  tags: (properties = null, filled = false) => {
    if (filled) {
      return <TagsFilled {...(properties || {})} />;
    }

    return <TagsOutlined {...(properties || {})} />;
  },
  upload: (properties = null) => {
    return <UploadOutlined {...(properties || {})} />;
  },
  user: (properties = null) => {
    return <UserOutlined {...(properties || {})} />;
  },
  video: (properties = null, filled = false) => {
    if (filled) {
      return <VideoCameraFilled {...(properties || {})} />;
    }

    return <VideoCameraOutlined {...(properties || {})} />;
  },
  videoCamera: (properties = null, filled = false) => {
    if (filled) {
      return <VideoCameraFilled {...(properties || {})} />;
    }

    return <VideoCameraOutlined {...(properties || {})} />;
  },
  videoCameraAdd: (properties = null) => {
    return <VideoCameraAddOutlined {...(properties || {})} />;
  },
  loading: (properties = null) => {
    return <LoadingOutlined {...(properties || {})} />;
  },
  team: (properties = null) => {
    return <TeamOutlined {...(properties || {})} />;
  },
  users: (properties = null) => {
    return <TeamOutlined {...(properties || {})} />;
  },
  tool: (properties = null, filled = false) => {
    if (filled) {
      return <ToolFilled {...(properties || {})} />;
    }

    return <ToolOutlined {...(properties || {})} />;
  },
  sync: (properties = null) => {
    return <SyncOutlined {...(properties || {})} />;
  },
  sound: (properties = null, filled = false) => {
    if (filled) {
      return <SoundFilled {...(properties || {})} />;
    }

    return <SoundOutlined {...(properties || {})} />;
  },
  shop: (properties = null, filled = false) => {
    if (filled) {
      return <ShopFilled {...(properties || {})} />;
    }

    return <ShopOutlined {...(properties || {})} />;
  },
  shoppingCart: (properties = null) => {
    return <ShoppingCartOutlined {...(properties || {})} />;
  },
  shopping: (properties = null, filled = false) => {
    if (filled) {
      return <ShoppingFilled {...(properties || {})} />;
    }

    return <ShoppingOutlined {...(properties || {})} />;
  },
  schedule: (properties = null, filled = false) => {
    if (filled) {
      return <ScheduleFilled {...(properties || {})} />;
    }

    return <ScheduleOutlined {...(properties || {})} />;
  },
  scan: (properties = null) => {
    return <ScanOutlined {...(properties || {})} />;
  },
  read: (properties = null, filled = false) => {
    if (filled) {
      return <ReadFilled {...(properties || {})} />;
    }

    return <ReadOutlined {...(properties || {})} />;
  },
  qrCode: (properties = null) => {
    return <QrcodeOutlined {...(properties || {})} />;
  },
  powerOff: (properties = null) => {
    return <PoweroffOutlined {...(properties || {})} />;
  },
  phone: (properties = null, filled = false) => {
    if (filled) {
      return <PhoneFilled {...(properties || {})} />;
    }

    return <PhoneOutlined {...(properties || {})} />;
  },
  profile: (properties = null, filled = false) => {
    if (filled) {
      return <ProfileFilled {...(properties || {})} />;
    }

    return <ProfileOutlined {...(properties || {})} />;
  },
  project: (properties = null, filled = false) => {
    if (filled) {
      return <ProjectFilled {...(properties || {})} />;
    }

    return <ProjectOutlined {...(properties || {})} />;
  },
  message: (properties = null, filled = false) => {
    if (filled) {
      return <MessageFilled {...(properties || {})} />;
    }

    return <MessageOutlined {...(properties || {})} />;
  },
  layout: (properties = null, filled = false) => {
    if (filled) {
      return <LayoutFilled {...(properties || {})} />;
    }

    return <LayoutOutlined {...(properties || {})} />;
  },
  lock: (properties = null, filled = false) => {
    if (filled) {
      return <LockFilled {...(properties || {})} />;
    }

    return <LockOutlined {...(properties || {})} />;
  },
  unlock: (properties = null, filled = false) => {
    if (filled) {
      return <UnlockFilled {...(properties || {})} />;
    }

    return <UnlockOutlined {...(properties || {})} />;
  },
  mail: (properties = null, filled = false) => {
    if (filled) {
      return <MailFilled {...(properties || {})} />;
    }

    return <MailOutlined {...(properties || {})} />;
  },
  line: (properties = null) => {
    return <LineOutlined {...(properties || {})} />;
  },
  key: (properties = null) => {
    return <KeyOutlined {...(properties || {})} />;
  },
  history: (properties = null) => {
    return <HistoryOutlined {...(properties || {})} />;
  },
  gift: (properties = null, filled = false) => {
    if (filled) {
      return <GiftFilled {...(properties || {})} />;
    }

    return <GiftOutlined {...(properties || {})} />;
  },
  folder: (properties = null, filled = false) => {
    if (filled) {
      return <FolderFilled {...(properties || {})} />;
    }

    return <FolderOutlined {...(properties || {})} />;
  },
  filter: (properties = null, filled = false) => {
    if (filled) {
      return <FilterFilled {...(properties || {})} />;
    }

    return <FilterOutlined {...(properties || {})} />;
  },
  download: (properties = null) => {
    return <DownloadOutlined {...(properties || {})} />;
  },
  ellipsis: (properties = null) => {
    return <EllipsisOutlined {...(properties || {})} />;
  },
  desktop: (properties = null) => {
    return <DesktopOutlined {...(properties || {})} />;
  },
  dashboard: (properties = null, filled = false) => {
    if (filled) {
      return <DashboardFilled {...(properties || {})} />;
    }

    return <DashboardOutlined {...(properties || {})} />;
  },
  contacts: (properties = null, filled = false) => {
    if (filled) {
      return <ContactsFilled {...(properties || {})} />;
    }

    return <ContactsOutlined {...(properties || {})} />;
  },
  clear: (properties = null) => {
    return <ClearOutlined {...(properties || {})} />;
  },
  bell: (properties = null, filled = false) => {
    if (filled) {
      return <BellFilled {...(properties || {})} />;
    }

    return <BellOutlined {...(properties || {})} />;
  },
  undo: (properties = null) => {
    return <UndoOutlined {...(properties || {})} />;
  },
  redo: (properties = null) => {
    return <RedoOutlined {...(properties || {})} />;
  },
  form: (properties = null) => {
    return <FormOutlined {...(properties || {})} />;
  },
  warning: (properties = null, filled = false) => {
    if (filled) {
      return <WarningFilled {...(properties || {})} />;
    }

    return <WarningOutlined {...(properties || {})} />;
  },
  question: (properties = null, filled = false) => {
    if (filled) {
      return <QuestionCircleFilled {...(properties || {})} />;
    }

    return <QuestionCircleOutlined {...(properties || {})} />;
  },
  logout: (properties = null) => {
    return <LogoutOutlined {...(properties || {})} />;
  },
  login: (properties = null) => {
    return <LoginOutlined {...(properties || {})} />;
  },
  arrowUp: (properties = null) => {
    return <ArrowUpOutlined {...(properties || {})} />;
  },
  arrowDown: (properties = null) => {
    return <ArrowDownOutlined {...(properties || {})} />;
  },
  arrowLeft: (properties = null) => {
    return <ArrowLeftOutlined {...(properties || {})} />;
  },
  arrowRight: (properties = null) => {
    return <ArrowRightOutlined {...(properties || {})} />;
  },
  swap: (properties = null) => {
    return <SwapOutlined {...(properties || {})} />;
  },
  online: (properties = null) => {
    return <VerticalAlignTopOutlined {...(properties || {})} />;
  },
  offline: (properties = null) => {
    return <VerticalAlignBottomOutlined {...(properties || {})} />;
  },
  up: (properties = null) => {
    return <UpOutlined {...(properties || {})} />;
  },
  upCircle: (properties = null, filled = false) => {
    if (filled) {
      return <UpCircleFilled {...(properties || {})} />;
    }

    return <UpCircleOutlined {...(properties || {})} />;
  },
  down: (properties = null) => {
    return <DownOutlined {...(properties || {})} />;
  },
  downCircle: (properties = null, filled = false) => {
    if (filled) {
      return <DownCircleFilled {...(properties || {})} />;
    }

    return <DownCircleOutlined {...(properties || {})} />;
  },
  left: (properties = null) => {
    return <LeftOutlined {...(properties || {})} />;
  },
  leftCircle: (properties = null, filled = false) => {
    if (filled) {
      return <LeftCircleFilled {...(properties || {})} />;
    }

    return <LeftCircleOutlined {...(properties || {})} />;
  },
  right: (properties = null) => {
    return <RightOutlined {...(properties || {})} />;
  },
  rightCircle: (properties = null, filled = false) => {
    if (filled) {
      return <RightCircleFilled {...(properties || {})} />;
    }

    return <RightCircleOutlined {...(properties || {})} />;
  },
  picture: (properties = null, filled = false) => {
    if (filled) {
      return <PictureFilled {...(properties || {})} />;
    }

    return <PictureOutlined {...(properties || {})} />;
  },
  link: (properties = null) => {
    return <LinkOutlined {...(properties || {})} />;
  },
  checkCircle: (properties = null, filled = false) => {
    if (filled) {
      return <CheckCircleFilled {...(properties || {})} />;
    }

    return <CheckCircleOutlined {...(properties || {})} />;
  },
  warningCircle: (properties = null, filled = false) => {
    if (filled) {
      return <ExclamationCircleFilled {...(properties || {})} />;
    }

    return <ExclamationCircleOutlined {...(properties || {})} />;
  },
  sortAscending: (properties = null) => {
    return <SortAscendingOutlined {...(properties || {})} />;
  },
  sortDescending: (properties = null) => {
    return <SortDescendingOutlined {...(properties || {})} />;
  },
  infoCircle: (properties = null, filled = false) => {
    if (filled) {
      return <InfoCircleFilled {...(properties || {})} />;
    }

    return <InfoCircleOutlined {...(properties || {})} />;
  },
  instagram: (properties = null, filled = false) => {
    if (filled) {
      return <InstagramFilled {...(properties || {})} />;
    }

    return <InstagramOutlined {...(properties || {})} />;
  },
  disconnect: (properties = null) => {
    return <DisconnectOutlined {...(properties || {})} />;
  },
  insertRowAbove: (properties = null) => {
    return <InsertRowAboveOutlined {...(properties || {})} />;
  },
  insertRowBelow: (properties = null) => {
    return <InsertRowBelowOutlined {...(properties || {})} />;
  },
  insertRowLeft: (properties = null) => {
    return <InsertRowLeftOutlined {...(properties || {})} />;
  },
  insertRowRight: (properties = null) => {
    return <InsertRowRightOutlined {...(properties || {})} />;
  },
  rollback: (properties = null) => {
    return <RollbackOutlined {...(properties || {})} />;
  },
  snippets: (properties = null, filled = false) => {
    if (filled) {
      return <SnippetsFilled {...(properties || {})} />;
    }

    return <SnippetsOutlined {...(properties || {})} />;
  },
  compress: (properties = null) => {
    return <CompressOutlined {...(properties || {})} />;
  },
  minusCircle: (properties = null, filled = false) => {
    if (filled) {
      return <MinusCircleFilled {...(properties || {})} />;
    }

    return <MinusCircleOutlined {...(properties || {})} />;
  },
  select: (properties = null) => {
    return <SelectOutlined {...(properties || {})} />;
  },
  plusSquare: (properties = null, filled = false) => {
    if (filled) {
      return <PlusSquareFilled {...(properties || {})} />;
    }

    return <PlusSquareOutlined {...(properties || {})} />;
  },
  unorderedList: (properties = null) => {
    return <UnorderedListOutlined {...(properties || {})} />;
  },
  fork: (properties = null) => {
    return <ForkOutlined {...(properties || {})} />;
  },
  bug: (properties = null, filled = false) => {
    if (filled) {
      return <BugFilled {...(properties || {})} />;
    }

    return <BugOutlined {...(properties || {})} />;
  },
  cloudDownload: (properties = null) => {
    return <CloudDownloadOutlined {...(properties || {})} />;
  },
  reconciliation: (properties = null, filled = false) => {
    if (filled) {
      return <ReconciliationFilled {...(properties || {})} />;
    }

    return <ReconciliationOutlined {...(properties || {})} />;
  },
  apartment: (properties = null) => {
    return <ApartmentOutlined {...(properties || {})} />;
  },
  dingDing: (properties = null) => {
    return <DingdingOutlined {...(properties || {})} />;
  },
  macCommand: (properties = null, filled = false) => {
    if (filled) {
      return <MacCommandFilled {...(properties || {})} />;
    }

    return <MacCommandOutlined {...(properties || {})} />;
  },
  inbox: (properties = null) => {
    return <InboxOutlined {...(properties || {})} />;
  },
  save: (properties = null, filled = false) => {
    if (filled) {
      return <SaveFilled {...(properties || {})} />;
    }

    return <SaveOutlined {...(properties || {})} />;
  },
  file: (properties = null, filled = false) => {
    if (filled) {
      return <FileFilled {...(properties || {})} />;
    }

    return <FileOutlined {...(properties || {})} />;
  },
  mobile: (properties = null, filled = false) => {
    if (filled) {
      return <MobileFilled {...(properties || {})} />;
    }

    return <MobileOutlined {...(properties || {})} />;
  },
  borderOuter: (properties = null) => {
    return <BorderOuterOutlined {...(properties || {})} />;
  },
  columnHeight: (properties = null) => {
    return <ColumnHeightOutlined {...(properties || {})} />;
  },
  verticalAlignMiddle: (properties = null) => {
    return <VerticalAlignMiddleOutlined {...(properties || {})} />;
  },
  caretUp: (properties = null, filled = false) => {
    if (filled) {
      return <CaretUpFilled {...(properties || {})} />;
    }

    return <CaretUpOutlined {...(properties || {})} />;
  },
  caretDown: (properties = null, filled = false) => {
    if (filled) {
      return <CaretDownFilled {...(properties || {})} />;
    }

    return <CaretDownOutlined {...(properties || {})} />;
  },
  retweet: (properties = null) => {
    return <RetweetOutlined {...(properties || {})} />;
  },
  exclamationCircle: (properties = null, filled = false) => {
    if (filled) {
      return <ExclamationCircleFilled {...(properties || {})} />;
    }

    return <ExclamationCircleOutlined {...(properties || {})} />;
  },
};
