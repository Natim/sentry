"""
sentry.utils.dates
~~~~~~~~~~~~~~~~~~

:copyright: (c) 2010-2014 by the Sentry Team, see AUTHORS for more details.
:license: BSD, see LICENSE for more details.
"""
from __future__ import absolute_import

from datetime import datetime
from dateutil.parser import parse
from django.db import connections

import pytz

from sentry.utils.db import get_db_engine


DATE_TRUNC_GROUPERS = {
    'oracle': {
        'hour': 'hh24',
    },
    'default': {
        'date': 'day',
        'hour': 'hour',
        'minute': 'minute',
    },
}


def to_timestamp(value):
    return (value - datetime(1970, 1, 1, tzinfo=pytz.utc)).total_seconds()


def get_sql_date_trunc(col, db='default', grouper='hour'):
    conn = connections[db]

    engine = get_db_engine(db)
    # TODO: does extract work for sqlite?
    if engine.startswith('oracle'):
        method = DATE_TRUNC_GROUPERS['oracle'].get(grouper, DATE_TRUNC_GROUPERS['default'][grouper])
        if '"' not in col:
            col = '"%s"' % col.upper()
    else:
        method = DATE_TRUNC_GROUPERS['default'][grouper]
    return conn.ops.date_trunc_sql(method, col)


def parse_date(datestr, timestr):
    # format is Y-m-d
    if not (datestr or timestr):
        return
    if not timestr:
        return datetime.strptime(datestr, '%Y-%m-%d')

    datetimestr = datestr.strip() + ' ' + timestr.strip()
    try:
        return datetime.strptime(datetimestr, '%Y-%m-%d %I:%M %p')
    except Exception:
        try:
            return parse(datetimestr)
        except Exception:
            return
