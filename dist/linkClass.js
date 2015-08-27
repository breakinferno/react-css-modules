'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var linkClass = undefined;

/**
 * @param {ReactElement} element
 * @param {Object} styles CSS modules class map.
 * @param {CSSModules~Options} options
 * @return {ReactElement}
 */
linkClass = function (element) {
    var styles = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var childrenCount = undefined,
        clonedElement = undefined,
        moduleNames = undefined,
        newChildren = undefined,
        newProps = undefined,
        appendClassName = undefined;

    moduleNames = element.props.moduleName;

    if (moduleNames) {
        moduleNames = moduleNames.split(' ');

        if (options.allowMultiple === false && moduleNames.length > 1) {
            throw new Error('ReactElement moduleName property defines multiple module names ("' + element.props.moduleName + '").');
        }

        appendClassName = moduleNames.map(function (moduleName) {
            if (styles[moduleName]) {
                return styles[moduleName];
            } else {
                if (options.errorWhenNotFound === true) {
                    throw new Error('"' + moduleName + '" CSS module is undefined.');
                }

                return '';
            }
        });

        appendClassName = appendClassName.filter(function (className) {
            return className.length;
        });

        appendClassName = appendClassName.join(' ');
    }

    // A child can be either an array, a sole object or a string.
    // <div>test</div>
    if (typeof element.props.children !== 'string') {
        childrenCount = _react2['default'].Children.count(element.props.children);

        if (childrenCount > 1) {
            newChildren = _react2['default'].Children.map(element.props.children, function (node) {
                if (_react2['default'].isValidElement(node)) {
                    return linkClass(node, styles, options);
                } else {
                    return node;
                }
            });
        } else if (childrenCount === 1) {
            newChildren = linkClass(_react2['default'].Children.only(element.props.children), styles, options);
        }
    }

    if (appendClassName) {
        if (element.props.className) {
            appendClassName = element.props.className + ' ' + appendClassName;
        }

        newProps = {
            className: appendClassName
        };
    }

    if (newChildren) {
        clonedElement = _react2['default'].cloneElement(element, newProps, newChildren);
    } else {
        clonedElement = _react2['default'].cloneElement(element, newProps);
    }

    return clonedElement;
};

exports['default'] = linkClass;
module.exports = exports['default'];