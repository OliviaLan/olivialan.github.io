d3.sankey = function() {
  var sankey = {},
      nodeWidth = 24,
      nodePadding = 8,//
      size = [1, 1],
      nodes = [],
      links = [];
name_conversions = {
  "Cust activates NewDevice_0":"Cust activates NewDevice",
  "Retail - Indirect_1":"Retail - Indirect",
  "OnlineI_743433374_0":"Online Interaction",
  "IVRIn_1382793449_0":"IVR Interaction",
  "Retai_449778247_0":"Retail - Direct",
  "MobileAppIn1819461526_0":"MobileApp Interaction",
  "Spoke_417978764_0":"Spoke with Care Rep",
  "Teles_1505239166_0":"Telesales",

  "Custa_1165459319_1":"Cust activates NewDevice",
  "Retai1424791326_1":"Retail - Indirect",
  "OnlineI_743433374_1":"Online Interaction",
  "IVRIn_1382793449_1":"IVR Interaction",
  "Retai_449778247_1":"Retail - Direct",
  "MobileAppIn1819461526_1":"MobileApp Interaction",
  "Spoke_417978764_1":"Spoke with Care Rep",
  "Teles_1505239166_1":"Telesales",

  "Custa_1165459319_2":"Cust activates NewDevice",
  "Retai1424791326_2":"Retail - Indirect",
  "OnlineI_743433374_2":"Online Interaction",
  "IVRIn_1382793449_2":"IVR Interaction",
  "Retai_449778247_2":"Retail - Direct",
  "MobileAppIn1819461526_2":"MobileApp Interaction",
  "Spoke_417978764_2":"Spoke with Care Rep",
  "Teles_1505239166_2":"Telesales",

  "Custa_1165459319_3":"Cust activates NewDevice",
  "Retai1424791326_3":"Retail - Indirect",
  "OnlineI_743433374_3":"Online Interaction",
  "IVRIn_1382793449_3":"IVR Interaction",
  "Retai_449778247_3":"Retail - Direct",
  "MobileAppIn1819461526_3":"MobileApp Interaction",
  "Spoke_417978764_3":"Spoke with Care Rep",
  "Teles_1505239166_3":"Telesales",

  "Custa_1165459319_4":"Cust activates NewDevice",
  "Retai1424791326_4":"Retail - Indirect",
  "OnlineI_743433374_4":"Online Interaction",
  "IVRIn_1382793449_4":"IVR Interaction",
  "Retai_449778247_4":"Retail - Direct",
  "MobileAppIn1819461526_4":"MobileApp Interaction",
  "Spoke_417978764_4":"Spoke with Care Rep",
  "Teles_1505239166_4":"Telesales",

  "Custa_1165459319_5":"Cust activates NewDevice",
 "Retai1424791326_5":"Retail - Indirect",
  "OnlineI_743433374_5":"Online Interaction",
  "IVRIn_1382793449_5":"IVR Interaction",
  "Retai_449778247_5":"Retail - Direct",
  "MobileAppIn1819461526_5":"MobileApp Interaction",
  "Spoke_417978764_5":"Spoke with Care Rep",
  "Teles_1505239166_5":"Telesales",

  "Custa_1165459319_6":"Cust activates NewDevice",
  "Retai1424791326_6":"Retail - Indirect",
  "OnlineI_743433374_6":"Online Interaction",
  "IVRIn_1382793449_6":"IVR Interaction",
  "Retai_449778247_6":"Retail - Direct",
  "MobileAppIn1819461526_6":"MobileApp Interaction",
  "Spoke_417978764_6":"Spoke with Care Rep",
  "Teles_1505239166_6":"Telesales",

  "Custa_1165459319_7":"Cust activates NewDevice",
  "Retai1424791326_7":"Retail - Indirect",
  "OnlineI_743433374_7":"Online Interaction",
  "IVRIn_1382793449_7":"IVR Interaction",
  "Retai_449778247_7":"Retail - Direct",
  "MobileAppIn1819461526_7":"MobileApp Interaction",
  "Spoke_417978764_7":"Spoke with Care Rep",
  "Teles_1505239166_7":"Telesales",

}
  sankey.nodeWidth = function(_) {
    if (!arguments.length) return nodeWidth;
    nodeWidth = +_;
    return sankey;
  };

  sankey.nodePadding = function(_) {
    if (!arguments.length) return nodePadding;
    nodePadding = +_;
    return sankey;
  };

  sankey.nodes = function(_) {
    if (!arguments.length) return nodes;
    nodes = _;

    return sankey;
  };

  sankey.links = function(_) {
    if (!arguments.length) return links;
    links = _;
    return sankey;
  };

  sankey.size = function(_) {
    if (!arguments.length) return size;
    size = _;
    return sankey;
  };

  sankey.layout = function(iterations) {
    computeNodeLinks();
    computeNodeValues();
    computeNodeBreadths();
    computeNodeDepths(iterations);
    computeLinkDepths();
    return sankey;
  };

  sankey.relayout = function() {
    computeLinkDepths();
    return sankey;
  };

  sankey.link = function() {
    var curvature = .5;

    function link(d) {
      //console.log(nodes)
      var x0 = d.source.x + d.source.dx,
          x1 = d.target.x,
          xi = d3.interpolateNumber(x0, x1),
          x2 = xi(curvature),
          x3 = xi(1 - curvature),
          y0 = d.source.y + d.sy + d.dy / 2,
          y1 = d.target.y + d.ty + d.dy / 2;
      return "M" + x0 + "," + y0
           + "C" + x2 + "," + y0
           + " " + x3 + "," + y1
           + " " + x1 + "," + y1;
    }

    link.curvature = function(_) {
      if (!arguments.length) return curvature;
      curvature = +_;
      return link;
    };

    return link;
  };

  // Populate the sourceLinks and targetLinks for each node.
  // Also, if the source and target are not objects, assume they are indices.
  function computeNodeLinks() {
    //console.log(nodes)
    nodes.forEach(function(node) {

      node.sourceLinks = [];
      node.targetLinks = [];
    });
    links.forEach(function(link) {
      var source = link.source,
          target = link.target;
      if (typeof source === "number") source = link.source = nodes[link.source];
      if (typeof target === "number") target = link.target = nodes[link.target];
      source.sourceLinks.push(link);
      target.targetLinks.push(link);
    });
  }

  // Compute the value (size) of each node by summing the associated links.
  function computeNodeValues() {
   // console.log(nodes)
    nodes.forEach(function(node) {
      node.value = Math.max(
        d3.sum(node.sourceLinks, value),
        d3.sum(node.targetLinks, value)
      );
    });
  }

  // Iteratively assign the breadth (x-position) for each node.
  // Nodes are assigned the maximum breadth of incoming neighbors plus one;
  // nodes with no incoming links are assigned breadth zero, while
  // nodes with no outgoing links are assigned the maximum breadth.
  function computeNodeBreadths() {
    //console.log(nodes)
    var remainingNodes = nodes,
        nextNodes,
        x = 0;

    while (remainingNodes.length) {
      nextNodes = [];
      remainingNodes.forEach(function(node) {
        node.x = x;
        node.dx = nodeWidth;
       //have n0de y
        node.sourceLinks.forEach(function(link) {
          if (nextNodes.indexOf(link.target) < 0) {
            nextNodes.push(link.target);
          }
        });
      });
      remainingNodes = nextNodes;
      ++x;
    }

    //
    moveSinksRight(x);
    scaleNodeBreadths((size[0] - nodeWidth) / (x - 1));
  }

  function moveSourcesRight() {
    nodes.forEach(function(node) {
      if (!node.targetLinks.length) {
        node.x = d3.min(node.sourceLinks, function(d) { return d.target.x; }) - 1;
      }
    });
  }

  function moveSinksRight(x) {
    nodes.forEach(function(node) {
      if (!node.sourceLinks.length) {
        node.x = x - 1;
      }
    });
  }

  function scaleNodeBreadths(kx) {
    nodes.forEach(function(node) {
      node.x *= kx;
    });
  }

  function computeNodeDepths(iterations) {
   // console.log(nodes)
    var nodesByBreadth = d3.nest()
        .key(function(d) { return d.x; })
        .sortKeys(d3.ascending)
        .entries(nodes)
        .map(function(d) { 

          return d.values; });

    //
    initializeNodeDepth();
    resolveCollisions();
    for (var alpha = 1; iterations > 0; --iterations) {
      //console.log(nodes)
      relaxRightToLeft(alpha *= .99);
      resolveCollisions();
      relaxLeftToRight(alpha);
      resolveCollisions();
    }

    function initializeNodeDepth() {

      //console.log(nodes)
      var ky = d3.min(nodesByBreadth, function(nodes) {
        return (size[1] - (nodes.length - 1) * nodePadding) / d3.sum(nodes, value);
      });

      nodesByBreadth.forEach(function(nodes) {
        nodes.forEach(function(node, i) {
          node.y = i;
          node.dy = node.value * ky ;
        });
      });

      links.forEach(function(link) {
        link.dy = link.value * ky;
      });
    }

    function relaxLeftToRight(alpha) {
     // console.log(nodes)
      nodesByBreadth.forEach(function(nodes, breadth) {
        nodes.forEach(function(node) {
          if (node.targetLinks.length) {
            var y = d3.sum(node.targetLinks, weightedSource) / d3.sum(node.targetLinks, value);
            // console.log( value )
            node.y += (y - center(node)) * alpha;
            
          }
        });
      });

      function weightedSource(link) {
        return center(link.source) * link.value;
      }
    }

    function relaxRightToLeft(alpha) {
      //console.log(nodes)
      nodesByBreadth.slice().reverse().forEach(function(nodes) {
        nodes.forEach(function(node) {
          if (node.sourceLinks.length) {
            var y = d3.sum(node.sourceLinks, weightedTarget) / d3.sum(node.sourceLinks, value);
            node.y += (y - center(node)) * alpha;
          }
        });
      });

      function weightedTarget(link) {
        return center(link.target) * link.value;
      }
    }

    function resolveCollisions() {
      //console.log(nodes)

      nodesByBreadth.forEach(function(nodes) {
        var node,
            dy,
            y0 = 0,
            n = nodes.length,
            i;

        // Push any overlapping nodes down.

        //拒绝sort！！！不按照量级排序
        //nodes.sort(ascendingDepth);
        for (i = 0; i < n; ++i) {
          node = nodes[i];
          //宽度重映射
          dy = y0 - node.y;
          //dy = y0*0.7 - node.y*0.3;
          if (dy > 0) {
          //可以在这里进行位置重映射
          node.y += dy;
          }
          y0 = node.y + node.dy + nodePadding;//node 间的padding
          //y0 = node.y + node.dy + Math.random()*100;//更改上下错落padding

        }

          // If the bottommost node goes outside the bounds, push it back up.
          dy = y0 - nodePadding - size[1];
        if (dy > 0) {
          y0 = node.y -= dy;

          // Push any overlapping nodes back up.
          for (i = n - 2; i >= 0; --i) {
            node = nodes[i];
            dy = node.y + node.dy + nodePadding - y0;
            if (dy > 0) node.y -= dy;
            y0 = node.y;
          }
        }
      });
    }

    function ascendingDepth(a, b) {
      return a.y - b.y;
    }
  }

  function computeLinkDepths() {
    //console.log(nodes)
    nodes.forEach(function(node) {
      node.sourceLinks.sort(ascendingTargetDepth);
      node.targetLinks.sort(ascendingSourceDepth);
    });
    nodes.forEach(function(node) {
      var sy = 0, ty = 0;
      node.sourceLinks.forEach(function(link) {
        link.sy = sy;
        sy += link.dy;
      });
      node.targetLinks.forEach(function(link) {
        link.ty = ty;
        ty += link.dy;
      });
    });

    function ascendingSourceDepth(a, b) {
      return a.source.y - b.source.y;
    }

    function ascendingTargetDepth(a, b) {
      return a.target.y - b.target.y;
    }
  }

  function center(node) {
    //console.log(nodes)
    return node.y + node.dy / 2;
  }

  function value(link) {
    return link.value;
  }
    
  return sankey;
};
