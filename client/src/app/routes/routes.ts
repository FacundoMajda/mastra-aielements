import {
  ContainerDemoPage,
  DashboardPage,
  DataTablePage,
  FeaturePage,
  HomePage,
  MedicalRAGPage,
  AppointmentsPage,
  AppointmentsCalendarPage,
  DiagnosticsPage,
  OutcomesPage,
  WebDocsViewerPage,
  FileSourcesViewerPage,
  SourcesViewerLayout,
  VisualizerLayout,
  SemanticSearchPage,
  Dashboard3DPage,
  ConversationPage,
  AppointmentsLayout,
} from "../pages";

export interface IRoute {
  path?: string;
  Component: React.ComponentType<any>;
  children?: IRoute[];
  index?: boolean;
  requiresAuth?: boolean;
}

const AppRoutes: IRoute[] = [
  {
    path: "/",
    index: true,
    Component: HomePage,
    requiresAuth: true,
  },

  {
    path: "/feature",
    Component: FeaturePage,
    requiresAuth: true,
  },
  {
    path: "/dashboard",
    Component: DashboardPage,
    requiresAuth: true,
  },
  {
    path: "/container-demo",
    Component: ContainerDemoPage,
    requiresAuth: true,
  },
  {
    path: "/visualizer",
    Component: VisualizerLayout,
    requiresAuth: true,
    children: [
      {
        index: true,
        Component: MedicalRAGPage,
      },
      {
        path: "webview",
        Component: WebDocsViewerPage,
      },
    ],
  },
  {
    path: "/data-table",
    Component: DataTablePage,
    requiresAuth: true,
  },
  {
    path: "/appointments",
    Component: AppointmentsLayout,
    requiresAuth: true,
    children: [
      {
        index: true,
        Component: AppointmentsPage,
      },
      {
        path: "calendar",
        Component: AppointmentsCalendarPage,
      },
    ],
  },
  {
    path: "/sources/viewer",
    Component: SourcesViewerLayout,
    requiresAuth: true,
    children: [
      {
        index: true,
        Component: WebDocsViewerPage,
      },
      {
        path: "web/:id?",
        Component: WebDocsViewerPage,
      },
      {
        path: "file/:id",
        Component: FileSourcesViewerPage,
      },
    ],
  },
  {
    path: "/semantic-search",
    Component: SemanticSearchPage,
    requiresAuth: true,
  },
  {
    path: "/dashboard-3d",
    Component: Dashboard3DPage,
    requiresAuth: true,
  },
  {
    path: "/conversation",
    Component: ConversationPage,
    requiresAuth: true,
  },
  {
    path: "/diagnostics",
    Component: DiagnosticsPage,
    requiresAuth: true,
  },
  {
    path: "/outcomes",
    Component: OutcomesPage,
    requiresAuth: true,
  },
];

export default AppRoutes;
