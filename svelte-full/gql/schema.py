import graphene
from items.models import Movie, Page
from graphene_django.types import DjangoObjectType

# api-movie-model
class PageType(DjangoObjectType):
    name = graphene.String()
    html = graphene.String()
    
    # define which model will be the base
    class Meta:
        model = Page
    
    
    def resolve_name(self, info):
        return self.name

    def resolve_html(self, info):
        return self.html


# api-movie-model
class MovieType(DjangoObjectType):
    id = graphene.Int()
    name = graphene.String()
    year = graphene.Int()
    summary = graphene.String()
    poster_url = graphene.String()
    slug = graphene.String()
    
    # define which model will be the base
    class Meta:
        model = Movie
        
    # 'self' corresponds to the item of Django model 
    # like The Lighthouse or Joker
    def resolve_id(self, info):
        return self.id
    
    def resolve_name(self, info):
        return self.name

    def resolve_year(self, info):
        return self.year

    def resolve_summary(self, info):
        return self.summary

    def resolve_poster_url(self, info):
        return self.poster_url

    def resolve_slug(self, info):
        return self.slug

class Query(graphene.ObjectType):
    movie_list = graphene.List(MovieType)
    movie = graphene.Field(MovieType, slug=graphene.String())
    page = graphene.Field(PageType, name=graphene.String())

    def resolve_page(self, info,name):
        return Page.objects.filter(name=name).first()

    def resolve_movie_list(self, info, *_):
        # for large lists only query what you need
        return Movie.objects.all().only("name", "poster_url", "slug")
    
    def resolve_movie(self, info, slug):
        movie_queryset = Movie.objects.filter(slug=slug)
        if movie_queryset.exists():
            return movie_queryset.first()



class PageMutation(graphene.Mutation):
    page = graphene.Field(PageType)
    message = graphene.String()

    class Arguments:
        name = graphene.String()
        html = graphene.String()

    def mutate(self, info, name, html):
        page_qs = Page.objects.filter(name=name)
        if page_qs.exists():
            page = page_qs.first()
            page.html = html
            page.save()
            return PageMutation(page=page, message="Success")
        else:
            return PageMutation(message="Page is not found")




class Mutation(graphene.ObjectType):
    page_mutation = PageMutation.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)