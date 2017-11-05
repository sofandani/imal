jQuery(function()
{
	jQuery('.carousel').carousel(
	{
	  interval: 2000
	});

	jQuery('#categoryFilter a.list-group-item:nth-last-child(5)').hide();
});

jQuery(document).ready(function($)
{
	if(screen.width <= 950)
	{
		jQuery.get('web_services/data/_Config.json', {}, function(data, textStatus, xhr) 
		{
			dataServerNative = data.server;
			thisDomainNative = dataServerNative.prefix + dataServerNative.domain + dataServerNative.suffix;
			//console.log(thisDomainNative);
			window.location = thisDomainNative + '/mobile';
		});
	}	
});
/*document.addEventListener("DOMContentLoaded", function(event)
{
	jQuery('#page-loading')
	.fadeOut(2000,function()
	{
		this.remove();
	});
});*/

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}