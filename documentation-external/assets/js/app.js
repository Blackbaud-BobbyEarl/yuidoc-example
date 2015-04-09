+function($) {
	$(function() {

		// Original last tab
		var doPrepend = true,
			titles = $('.class-description h1'),
			ul = $('.bb-nav-tabs'),
			title, li, id;

		// Verify the customization has properties
		if (ul.length) {

			// If the developer didn't use headings, add everything under a single heading
			if (titles.length === 0) {
				$('.class-description').prepend('<h1>Description</h1>');
				titles = $('.class-description h1');
			}

			// Convert descriptions into tabs
			titles.each(function(i) {

				title = $(this).text();
				id = title.toLowerCase();

				// Wrap all the content between each h3 into a tab-pane
			    $(this).nextUntil('h1').wrapAll('<div class="tab-pane" id="tab-' + id + '" />');

			    // Add a link
			    li =  $('<li><a href="#tab-' + id + '">' + title + '</a></li>');

			    // First h3 goes first, all others are added to the end
			    if (doPrepend) {
			    	ul.prepend(li);
			    	doPrepend = false;
			    } else {
			    	ul.append(li);
			    }

			    // Remove the original h3
			    $(this).remove();
			});

			// Move the description tab content
			$('.class-description .tab-pane').appendTo($('.tab-content'));
		    
		    // Listen for hash changes
		    $(window).on('hashchange', function() {
		    	$('.bb-nav-tabs a[href="' + window.location.hash + '"]').tab('show');
		    });

			// Show the tab requested in the hash or the first tab
		    if (location.hash !== '') {
		    	$('.bb-nav-tabs a[href="' + window.location.hash + '"]').tab('show');
		    } else {
				$('.bb-nav-tabs a:first').tab('show');
		    }

		}
	});
}(jQuery);