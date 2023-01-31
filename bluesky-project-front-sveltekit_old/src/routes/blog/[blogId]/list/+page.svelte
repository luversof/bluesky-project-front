<script type="ts">
	import { session } from '$app/stores';
	import type { BlogArticlePage } from '$lib/types';
	import { blogViewUrl } from '$lib/blog';
	import { foramtDate } from '$lib/date';
	import { marked } from 'marked';
	export let blogArticlePage: BlogArticlePage;

	let htmlEscapeToText = function (text) {
		return text.replace(/\&\#[0-9]*;|&amp;/g, function (escapeCode) {
			if (escapeCode.match(/amp/)) {
				return '&';
			}

			return String.fromCharCode(escapeCode.match(/[0-9]+/));
		});
	};
	// return a custom renderer for marked.
	let render_plain = function () {
		var render = new marked.Renderer();

		// render just the text of a link
		render.link = function (href, title, text) {
			return text;
		};

		// render just the text of a paragraph
		render.paragraph = function (text) {
			return htmlEscapeToText(text) + '\r\n';
		};

		// render just the text of a heading element, but indecate level
		render.heading = function (text, level) {
			return text + '\r\n';
		};

		// render nothing for images
		render.image = function (href, title, text) {
			return '';
		};

		return render;
	};

	function hasBlogArticle(): boolean {
		return (
			blogArticlePage != null &&
			blogArticlePage.content != null &&
			blogArticlePage.content.length > 0
		);
	}
</script>

<div class="min-h-screen flex">
	<div class="flex flex-col items-center justify-center w-full">
		<h1 class="text-4xl font-medium">글 목록</h1>
		<ul class="w-full lg:w-1/2">
			{#if hasBlogArticle()}
				{#each blogArticlePage.content as blogArticle}
					<li class="border-b border-b-gray-500 p-2 py-6">
						<article>
							<h2 class="text-3xl">
								<a href={blogViewUrl.view(blogArticle)}>{blogArticle.title}</a>
							</h2>
							<p class="py-2 h-20 overflow-hidden max-w-fit">
								{marked(blogArticle.content, { renderer: render_plain() })}
							</p>
							<div class="pt-2"><time>{foramtDate(blogArticle.createdDate)}</time></div>
						</article>
					</li>
				{/each}
			{:else}
				<li class="border-b border-b-gray-500 p-2">글 없음</li>
			{/if}
		</ul>
	</div>
</div>
