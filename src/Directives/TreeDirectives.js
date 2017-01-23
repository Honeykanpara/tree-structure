/**
 * Created by Amit Thakkar on 24/03/15.
 */
(function (ng) {
    var app = ng.module('tree.directives', []);

    app.directive('nodeTree', function () {
        return {
            template: '<div>'
            +'<node selected-nodes="selectedNodes" submit="clicked(message)" node="node" class="class" ng-repeat="node in tree"></node></div>',
            replace: true,
            restrict: 'E',
            scope: {
                tree: '=children',
                text: '=',
                selectedNodes:"="
            },
            link:function($scope){
                $scope.clicked= function (value){
                    $scope.data=value;
                    $scope.selectedNodes.push(value);
                };
            }
        };
    });
    app.directive('node', function ($compile) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'partials/node.html', 
            scope: {
                submit: '&',
                node: '=',
                selectedNodes:"="
            }
            ,// HTML for a single node.
            link: function (scope, element) {


                /*
                 * Here we are checking that if current node has children then compiling/rendering children.
                 * */
                scope.test="";
                if (scope.node && scope.node.children && scope.node.children.length > 0) {
                    scope.node.childrenVisibility = true;
                    var childNode = $compile('<ul class="tree" ng-if="!node.childrenVisibility"><node-tree selected-nodes="selectedNodes" children="node.children"></node-tree></ul>')(scope);
                    element.append(childNode);
                } else {
                    scope.node.childrenVisibility = false;
                }
            },
            controller: ["$scope", function ($scope) {
                // This function is for just toggle the visibility of children
                $scope.toggleVisibility = function (node) {
                    if (node.children) {
                        node.childrenVisibility = !node.childrenVisibility;
                    }
                };
                    /*$scope.clicked= function (value){
                    $scope.data=value;
                    $scope.selectedNodes.push(value);
                    console.log($scope.selectedNodes, value)
                }; */
                // Here We are marking check/un-check all the nodes.
                /*$scope.checkNode = function (node) {
                    node.checked = !node.checked;
                    function checkChildren(c) {
                        angular.forEach(c.children, function (c) {
                            c.checked = node.checked;
                            checkChildren(c);
                        });
                    }

                    checkChildren(node);
                };*/
            }]
        };
    });

})(angular);