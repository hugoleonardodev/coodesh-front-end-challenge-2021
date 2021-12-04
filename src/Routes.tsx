import React from 'react'
import { Route, Switch } from 'react-router-dom'

import LoadingFallback from '@components/atoms/LoadingFallback'

const HomePage = React.lazy(() => import('@pages/HomePage'))
const NotFound = React.lazy(() => import('@components/molecules/NotFound'))
const SharePatientPage = React.lazy(() => import('@pages/SharePatientPage'))

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route exact path="/">
                <React.Suspense fallback={<LoadingFallback />}>
                    <HomePage />
                </React.Suspense>
            </Route>
            <Route path="/about">
                <React.Suspense fallback={<LoadingFallback />}>
                    <div>About section under construction... 🚧</div>
                </React.Suspense>
            </Route>
            <Route path="/patient/:id">
                <React.Suspense fallback={<LoadingFallback />}>
                    <SharePatientPage />
                </React.Suspense>
            </Route>
            <Route path="/*">
                <React.Suspense fallback={<LoadingFallback />}>
                    <NotFound />
                </React.Suspense>
            </Route>
        </Switch>
    )
}

export default Routes
