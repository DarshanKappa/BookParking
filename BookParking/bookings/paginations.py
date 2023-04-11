from rest_framework.pagination import LimitOffsetPagination

class BasePagination(LimitOffsetPagination):
    default_limit = 2


class SlotBoardPagination(LimitOffsetPagination):
    
    default_limit=8

    def paginate_queryset(self, queryset, request, view=None):
        self.limit = self.get_limit(request)
        if self.limit is None:
            return None

        self.count = self.get_count(queryset)
        self.offset = self.get_offset(request)
        self.request = request
        if self.count > self.limit and self.template is not None:
            self.display_page_controls = True

        if self.count == 0 or self.offset > self.count:
            return []

        queryset = queryset[self.offset:self.offset + self.limit]

        return sorted(list(map(lambda x: x["slot_no"], queryset)))
