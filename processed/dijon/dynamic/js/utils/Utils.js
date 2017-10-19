/*global dijondemo */
/**
 * @author Camille Reynders
 * Date: 03/02/12
 * Time: 14:34
 */
(function( ns ) {___jdce_logger("/js/utils/Utils.js", 0);
	'use strict';

	ns.utils.Utils = {
		// https://gist.github.com/1308368
		uuid: function(){___jdce_logger("/js/utils/Utils.js", 1);},
		pluralize: function( count, word ) {___jdce_logger("/js/utils/Utils.js", 2);
			return count === 1 ? word : word + 's';
		}
	};

}( dijondemo ));
