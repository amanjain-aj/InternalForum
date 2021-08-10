import React from "react";
import { Switch, Route } from "react-router-dom";
import QuestionPage from "./pages/QuestionPage/QuestionPage";
import TagsPage from "./pages/TagsPage/TagsPage";
import PageContainer from "./components/PageContainer/PageContainer";
import WithPageTitle from "./services/WithPageTitle";
import LandingPage from "./pages/LandingPage/LandingPage";
import QuestionPageInfo from "./pages/QuestionPage/QuestionPageInfo/QuestionPageInfo";
import AskQuestionPage from "./pages/AskQuestionPage/AskQuestionPage";
import UserPage from "./pages/UserPage/UserPage";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import UserDetailsPage from "./pages/UserDetailsPage/UserDetailsPage";
import LoginPage from "./pages/LoginPage/login";
import SetPassword from "./pages/setPasswordPage/setpassword";

const LandingPageComponent = WithPageTitle({
  component: PageContainer({ component: LandingPage }),
  title: "Landingpage - Invincix Stackoverflow",
});

const QuestionsPageComponent = WithPageTitle({
  component: PageContainer({ component: QuestionPage }),
  title: "All Questions - Invincix Stackoverflow",
});

const QuestionPageInfoComponent = WithPageTitle({
  component: PageContainer({ component: QuestionPageInfo }),
});

const TagsPageComponent = WithPageTitle({
  component: PageContainer({ component: TagsPage }),
  title: "Tags - Invincix Stackoverflow",
});

const UserPageComponent = WithPageTitle({
  component: PageContainer({ component: UserPage }),
  title: "Users - Invincix Stackoverflow",
});

const UserDetailsPageComponent = WithPageTitle({
  component: PageContainer({ component: UserDetailsPage }),
});

const AskQuestionComponent = WithPageTitle({
  component: PageContainer({ component: AskQuestionPage }),
  title: "Ask Question - InvincixFlow",
});

const LoginPageComponent = WithPageTitle({
  component: LoginPage,
  title: "Login - Invincix Stackoverflow",
});

const SetPasswordPageComponent = WithPageTitle({
  component: SetPassword,
  title: "Set Password - Invincix Stackoverflow",
});

const NotFoundComponent = WithPageTitle({
  component: PageNotFound,
  title: "404 page- InvincixFlow",
});

const RouteConfiguration = () => {
  return (
    <Switch>
      <Route exact path="/" component={LandingPageComponent} />
      <Route exact path="/questions" component={QuestionsPageComponent} />
      <Route
        exact
        path="/question/:id/:title"
        render={() => <QuestionPageInfoComponent />}
      />
      <Route exact path="/tags" component={TagsPageComponent} />
      <Route exact path="/contributors" component={UserPageComponent} />
      <Route
        exact
        path="/users/:id/:userName"
        component={UserDetailsPageComponent}
      />
      <Route exact path="/askquestion" component={AskQuestionComponent} />
      <Route exact path="/login" component={LoginPageComponent} />
      <Route exact path="/setpassword" component={SetPasswordPageComponent} />
      <Route path="*" component={NotFoundComponent} />
    </Switch>
  );
};

export default RouteConfiguration;
