import React from "react";
import Router from "react-router";
var Route = Router.Route;
var Redirect = Router.Redirect;
var DefaultRoute = Router.DefaultRoute;

import App from "./views/app";
import GroupActivity from "./views/groupActivity";
import GroupDetails from "./views/groupDetails";
import GroupEventDetails from "./views/groupEventDetails";
import GroupEvents from "./views/groupEvents";
import GroupTags from "./views/groupTags";
import GroupTagValues from "./views/groupTagValues";
import GroupUserReports from "./views/groupUserReports";
import OrganizationDetails from "./views/organizationDetails";
import OrganizationStats from "./views/organizationStats";
import OrganizationTeams from "./views/organizationTeams";
import ProjectDashboard from "./views/projectDashboard";
import ProjectEvents from "./views/projectEvents";
import ProjectDetails from "./views/projectDetails";
import ProjectReleases from "./views/projectReleases";
import ReleaseAllEvents from "./views/releaseAllEvents";
import ReleaseArtifacts from "./views/releaseArtifacts";
import ReleaseDetails from "./views/releaseDetails";
import ReleaseNewEvents from "./views/releaseNewEvents";
import RouteNotFound from "./views/routeNotFound";
import SharedGroupDetails from "./views/sharedGroupDetails";
import Stream from "./views/stream";

var routes = (
  <Route name="app" path="/" handler={App}>
    <Redirect from="/organizations/:orgId" to="/organizations/:orgId/" />
    <Route path="/organizations/:orgId/" handler={OrganizationDetails}>
      <Redirect from="stats" to="/organizations/:orgId/stats/" />
      <Route name="organizationStats" path="stats/" handler={OrganizationStats} />
    </Route>
    <Route name="sharedGroupDetails" path="/share/group/:shareId/" handler={SharedGroupDetails} />
    <Redirect from="/:orgId" to="/:orgId/" />
    <Route name="organizationDetails" path="/:orgId/" handler={OrganizationDetails}>
      <DefaultRoute name="organizationTeams" handler={OrganizationTeams} />
      <Redirect from=":projectId" to="/:orgId/:projectId/" />
      <Route name="projectDetails" path=":projectId/" handler={ProjectDetails}>
        <DefaultRoute name="stream" handler={Stream} />
        <Redirect from="dashboard" to="/:orgId/:projectId/dashboard/" />
        <Route name="projectDashboard" path="dashboard/" handler={ProjectDashboard} />
        <Redirect from="events" to="/:orgId/:projectId/events/" />
        <Route name="projectEvents" path="events/" handler={ProjectEvents} />
        <Redirect from="releases" to="/:orgId/:projectId/releases/" />
        <Route name="projectReleases" path="releases/" handler={ProjectReleases} />
        <Redirect from="releases/:version" to="/:orgId/:projectId/releases/:version/" />
        <Route name="releaseDetails" path="releases/:version/" handler={ReleaseDetails}>
          <DefaultRoute name="releaseNewEvents" handler={ReleaseNewEvents} />
          <Redirect from="all-events" to="/:orgId/:projectId/releases/:version/all-events/" />
          <Route name="releaseAllEvents" path="all-events/" handler={ReleaseAllEvents} />
          <Redirect from="artifacts" to="/:orgId/:projectId/releases/:version/artifacts/" />
          <Route name="releaseArtifacts" path="artifacts/" handler={ReleaseArtifacts} />
        </Route>
        <Redirect from="group/:groupId" to="/:orgId/:projectId/group/:groupId/" />
        <Route name="groupDetails" path="group/:groupId/" handler={GroupDetails}
               ignoreScrollBehavior>
          <DefaultRoute name="groupOverview" handler={GroupEventDetails} />

          <Redirect from="activity" to="/:orgId/:projectId/group/:groupId/activity/" />
          <Route name="groupActivity" path="activity/" handler={GroupActivity} />
          <Redirect from="events/:eventId" to="/:orgId/:projectId/group/:groupId/events/:eventId/" />
          <Route name="groupEventDetails" path="events/:eventId/" handler={GroupEventDetails} />
          <Redirect from="events" to="/:orgId/:projectId/group/:groupId/events/" />
          <Route name="groupEvents" path="events/" handler={GroupEvents} />
          <Redirect from="tags" to="/:orgId/:projectId/group/:groupId/tags/" />
          <Route name="groupTags" path="tags/" handler={GroupTags} />
          <Redirect from="tags/:tagKey" to="/:orgId/:projectId/group/:groupId/tags/:tagKey/" />
          <Route name="groupTagValues" path="tags/:tagKey/" handler={GroupTagValues} />
          <Redirect from="reports" to="/:orgId/:projectId/group/:groupId/reports/" />
          <Route name="groupUserReports" path="reports/" handler={GroupUserReports} />
        </Route>
      </Route>
    </Route>
    <Router.NotFoundRoute handler={RouteNotFound} />
  </Route>
);

export default routes;
