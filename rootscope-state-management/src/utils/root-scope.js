import React from 'react';


class RootScope {
    constructor() {

    }

    set(namespace, value) {
        if (!RootScope.storage) {
            RootScope.storage = {};
        }
        RootScope.storage[namespace] = value;

        // Trigger listeners
        if (RootScope.listeners) {
            RootScope.listeners.forEach((listener)=> {
                if (listener.namespaces.indexOf(namespace) > -1) {
                    listener.handler(RootScope.storage);
                }
            });
        }
    }
    get() {
        return RootScope.storage || {};
    }

    registerListener(namespaces, handler) {
        if (!RootScope.listeners) {
            RootScope.listeners = [];
        }
        RootScope.listeners.push({
           namespaces: namespaces,
           handler: handler
        });
    }
}

/**
 * This is a simple implementation of state management system (like Redux)
 * Naming it rootScope based on angular`s $rootScope
 *
 * This HOC Provides following additional props (along with passed props)
 *  setInRootScope(namespace, value)
 *  listenOn([namespaces])
 *  rootScope
 * @param Component
 * @returns Component
 */
export default function createRootScopeHOC(Component) {
    return class RootScopeHOC extends React.Component {
        constructor(props) {
            super(props);
            this.rootScope = new RootScope();
        }
        setInRootScope = (namespace, value) => {
            this.rootScope.set(namespace, value);
        };

        listenOn = (namespaces) => {
            this.rootScope.registerListener(namespaces, (store)=> {
                this.forceUpdate();
            });
        };

        render() {
            let storage  = this.rootScope.get();
            return <Component {...this.props}
                              {...this.state}
                              listenOn = {this.listenOn}
                              rootScope = {storage}
                              setInRootScope={this.setInRootScope}/>
        }
    };
}