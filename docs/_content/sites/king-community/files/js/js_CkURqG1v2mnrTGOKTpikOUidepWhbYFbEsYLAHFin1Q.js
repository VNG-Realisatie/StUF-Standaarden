Drupal.locale = { 'pluralFormula': function ($n) { return Number(($n!=1)); }, 'strings': {"":{"An AJAX HTTP error occurred.":"Er is een AJAX HTTP fout opgetreden.","HTTP Result Code: !status":"HTTP-resultaatcode: !status","An AJAX HTTP request terminated abnormally.":"Een AJAX HTTP-aanvraag is onverwacht afgebroken","Debugging information follows.":"Debug informatie volgt.","Path: !uri":"Pad: !uri","StatusText: !statusText":"Statustekst: !statusText","ResponseText: !responseText":"Antwoordtekst: !responseText","ReadyState: !readyState":"ReadyState: !readyState","Please wait...":"Even geduld...","Shortcuts":"Snelkoppelingen","Select all":"Alles selecteren","(active tab)":"(actieve tabblad)","Hide":"Verbergen","Show":"Weergeven","Edit":"Bewerken","Autocomplete popup":"Popup voor automatisch aanvullen","Searching for matches...":"Zoeken naar overeenkomsten...","No results":"Geen resultaten","All":"Alle","New":"Nieuwe","No modules added within the last week.":"Afgelopen week zijn er geen modules toegevoegd.","No modules were enabled or disabled within the last week.":"Afgelopen week zijn geen modules ingeschakeld of uitgeschakeld.","Configure":"Instellen","Loading token browser...":"Tokenbrowser laden...","Available tokens":"Beschikbare tokens","Insert this token into your form":"Plaats deze token in uw formulier","First click a text field to insert your tokens into.":"Klik eerst een tekstveld aan om uw tokens in te plaatsen.","Hide summary":"Samenvatting verbergen","Edit summary":"Samenvatting bewerken","New revision":"Nieuwe revisie","No revision":"Geen revisie","By @name on @date":"Door @name op @date","By @name":"Door @name","Not published":"Niet gepubliceerd","@number comments per page":"@number reacties per pagina","Automatic alias":"Automatische alias","Alias: @alias":"Alias: @alias","No alias":"Geen alias","@label: @value":"@label: @value","The selected file %filename cannot be uploaded. Only files with the following extensions are allowed: %extensions.":"Het bestand %filename kan niet ge\u00fcpload worden. Alleen bestanden met de volgende extensies zijn toegestaan: %extensions","Re-order rows by numerical weight instead of dragging.":"Herschik de rijen op basis van gewicht, in plaats van slepen.","Show row weights":"Gewicht van rijen tonen","Hide row weights":"Gewicht van rij verbergen","Drag to re-order":"Slepen om de volgorde te wijzigen","Changes made in this table will not be saved until the form is submitted.":"Wijzigingen in deze tabel worden pas opgeslagen wanneer het formulier wordt ingediend.","Customize dashboard":"Dashboard aanpassen","Done":"Gereed","Not restricted":"Geen beperking","Restricted to certain pages":"Beperkt tot bepaalde pagina\u0027s","Not customizable":"Niet aanpasbaar","The changes to these blocks will not be saved until the \u003Cem\u003ESave blocks\u003C\/em\u003E button is clicked.":"Wijzigingen aan de blokken worden pas opgeslagen wanneer u de knop \u003Cem\u003EBlokken opslaan\u003C\/em\u003E aanklikt.","The block cannot be placed in this region.":"Het blok kan niet worden geplaatst in dit gebied.","Requires a title":"Een titel is verplicht","Don\u0027t display post information":"Geen berichtinformatie weergeven","@title dialog":"@title dialoog","Loading":"Laden","Enabled":"Ingeschakeld","Disabled":"Uitgeschakeld","Add":"Toevoegen","Menu":"Menu","Select all rows in this table":"Selecteer alle regels van deze tabel","Deselect all rows in this table":"De-selecteer alle regels van deze tabel","This permission is inherited from the authenticated user role.":"Dit toegangsrecht is ge\u00ebrfd van de rol \u0027geverifieerde gebruiker\u0027.","Also allow !name role to !permission?":"Mag !name ook !permission?","hours":"uren","seconds":"seconden","minutes":"minuten","Open file browser":"Bestandsbrowser openen","Remove group":"Groep verwijderen","Apply (all displays)":"Toepassen (alle weergaven)","Apply (this display)":"Toepassen (deze weergave)","Revert to default":"Terugzetten naar standaard","Change profile":"Profiel wijzigen","Downloads":"Downloads","Not tracked":"Niet gevolgd","One domain with multiple subdomains":"E\u00e9n domein met meerdere subdomeinen","Multiple top-level domains":"Meerdere topniveau domeinnamen","All pages with exceptions":"Alle pagina\u0027s met uitzonderingen","Excepted: @roles":"Uitgezonderd: @roles","A single domain":"Een enkel domein","Universal web tracking opt-out":"Universele web tracking opt-out.","No privacy":"Geen privacy","@items enabled":"@items ingeschakeld","Outbound links":"Externe links","Mailto links":"Mailto-links","AdSense ads":"AdSense-advertenties","Anonymize IP":"IP-adres anonimiseren","No redirects":"Geen omleidingen","1 redirect":"1 omleiding","@count redirects":"@count omleidingen","Colorbox":"Colorbox"}} };;
(function ($) {
  $(document).ready(function() {
    $.ajax({
      type: "POST",
      cache: false,
      url: Drupal.settings.statistics.url,
      data: Drupal.settings.statistics.data
    });
  });
})(jQuery);
;
(function ($) {

  if (typeof Drupal.settings.kcForumTopicOperations !== 'undefined') {
    // Get request time (used by Drupal.behaviors.kingCommunityThemeEditLinks)
    var requestTime = new Date(Drupal.settings.kcForumTopicOperations.requestTime);
    // Check if the current user is moderator of this page (used by Drupal.behaviors.kingCommunityThemeEditLinks)
    var isModerator = Drupal.settings.kcForumTopicOperations.isModerator;
  }

  // Show links on forum nodes and comments for non-admins and moderators
  Drupal.behaviors.kcForumTopicOperationsLinks = {
    attach: function(context) {

      // Get all hidden edit links
      var $editLinks = $('.post-edit-always a.hidden, .comment-edit-always a.hidden');

      // Get other hidden moderator links (like delete)
      var $modLinks = $('.post-delete-always a.hidden, .comment-delete-always a.hidden');

      // Get current logged in user from the most right menu item
      var userName = $('.pull-right > a').attr('data-name');

      $editLinks.add($modLinks).once().each(function() {
        var $this = $(this);

        // If the current user is a moderator show all links
        if (isModerator) {
          $this.removeClass('hidden');
        }
        // Else only show edit links of own posts and the edit limit time hasn't passed
        else if ($this.parent().hasClass('post-edit-always') || $this.parent().hasClass('comment-edit-always')) {
          // Get post container
          var $post = $this.closest('.forum-post');

          // Get author name of a forum post from the author pane
          var authorName = $post.find('.author-pane').attr('data-name');

          // Get post time
          var $postTime = $post.find('.forum-posted-on > *');

          // Comment times in datetime attribute
          if (typeof $postTime.attr('datetime') !== typeof undefined && $postTime.attr('datetime') !== false) {
            var postTimeObj = new Date($postTime.attr('datetime'));
          }
          // Node times in content attribute
          else {
            var postTimeObj = new Date($postTime.attr('content'));
          }

          // How long ago is the post created (in milliseconds)
          var postTimeAgo = requestTime - postTimeObj;

          // Only show the edit link if the post is made by the loged in user and less than 10 minutes ago
          if (authorName == userName && postTimeAgo < (10*60*1000)) {
            $this.removeClass('hidden');
          }
        }

      });
    }
  }


})(jQuery);
;
